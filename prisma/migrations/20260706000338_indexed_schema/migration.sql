-- CreateIndex
CREATE INDEX "Payments_requestId_idx" ON "Payments"("requestId");

-- CreateIndex
CREATE INDEX "Payments_status_idx" ON "Payments"("status");

-- CreateIndex
CREATE INDEX "Properties_userId_idx" ON "Properties"("userId");

-- CreateIndex
CREATE INDEX "Properties_categoryId_idx" ON "Properties"("categoryId");

-- CreateIndex
CREATE INDEX "Properties_locationId_idx" ON "Properties"("locationId");

-- CreateIndex
CREATE INDEX "Properties_isAvailable_idx" ON "Properties"("isAvailable");

-- CreateIndex
CREATE INDEX "Properties_price_idx" ON "Properties"("price");

-- CreateIndex
CREATE INDEX "Rental_Requests_userId_idx" ON "Rental_Requests"("userId");

-- CreateIndex
CREATE INDEX "Rental_Requests_propertyId_idx" ON "Rental_Requests"("propertyId");

-- CreateIndex
CREATE INDEX "Rental_Requests_status_idx" ON "Rental_Requests"("status");

-- CreateIndex
CREATE INDEX "Users_role_idx" ON "Users"("role");
