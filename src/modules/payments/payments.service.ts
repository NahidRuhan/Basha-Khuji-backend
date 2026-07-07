import Stripe from 'stripe';
import config from '../../config';
import { prisma } from '../../lib/prisma';
import { PaymentStatus, RentalRequestStatus } from '../../../generated/prisma/enums';

const stripe = new Stripe(config.stripe_secret_key);

const createPayment = async (userId: string, requestId: string) => {
    const request = await prisma.rentalRequests.findUnique({
        where: { requestId, userId },
        include: { property: true }
    });

    if (!request) {
        throw new Error("Rental request not found");
    }

    if (request.status !== RentalRequestStatus.APPROVED) {
        throw new Error("Rental request must be APPROVED to make a payment");
    }
    
    const existingPayment = await prisma.payments.findFirst({
        where: { requestId, status: PaymentStatus.COMPLETED }
    });
    
    if (existingPayment) {
        throw new Error("Payment already completed for this request");
    }

    const amount = Number(request.property.price);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'bdt',
                    product_data: {
                        name: request.property.propertyName,
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${config.app_url || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.app_url || 'http://localhost:3000'}/payment/cancel`,
        metadata: {
            requestId
        }
    });

    const payment = await prisma.payments.create({
        data: {
            requestId,
            transactionId: session.id,
            amount: amount,
            status: PaymentStatus.PENDING
        }
    });

    return {
        checkoutUrl: session.url,
        transactionId: session.id,
        paymentId: payment.paymentId
    };
};

const confirmPayment = async (userId: string, transactionId: string) => {
    const payment = await prisma.payments.findUnique({
        where: { transactionId },
        include: { rentalRequest: true }
    });

    if (!payment) {
        throw new Error("Payment not found");
    }
    
    if (payment.rentalRequest.userId !== userId) {
        throw new Error("Unauthorized");
    }

    if (payment.status === PaymentStatus.COMPLETED) {
        throw new Error("Payment already completed");
    }

    const session = await stripe.checkout.sessions.retrieve(transactionId);
    
    if (session.payment_status !== 'paid') {
        throw new Error(`Payment is not successful. Current status: ${session.payment_status}`);
    }

    const [updatedPayment] = await prisma.$transaction([
        prisma.payments.update({
            where: { transactionId },
            data: {
                status: PaymentStatus.COMPLETED,
                paidAt: new Date()
            }
        }),
        prisma.rentalRequests.update({
            where: { requestId: payment.requestId },
            data: {
                status: RentalRequestStatus.ACTIVE
            }
        })
    ]);

    return updatedPayment;
};

const getPaymentHistory = async (userId: string) => {
    return await prisma.payments.findMany({
        where: {
            rentalRequest: {
                userId
            }
        },
        include: {
            rentalRequest: {
                include: {
                    property: true
                }
            }
        }
    });
};

const getPaymentDetails = async (userId: string, paymentId: string) => {
    const payment = await prisma.payments.findUnique({
        where: { paymentId },
        include: {
            rentalRequest: {
                include: {
                    property: true
                }
            }
        }
    });

    if (!payment) {
        throw new Error("Payment not found");
    }

    if (payment.rentalRequest.userId !== userId) {
        throw new Error("Unauthorized");
    }

    return payment;
};

export const paymentsService = {
    createPayment,
    confirmPayment,
    getPaymentHistory,
    getPaymentDetails
};
