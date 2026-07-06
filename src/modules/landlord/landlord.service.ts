import { ICreateProperty } from "./landlord.interface";
import { prisma } from "../../lib/prisma";

const createProperty = async (userId: string, payLoad: ICreateProperty) => {
  const { categoryName, locationName, ...restPayload } = payLoad;

  const category = await prisma.categories.findUnique({
    where: { categoryName },
  });
  if (!category) {
    throw new Error("Category not found");
  }

  const location = await prisma.location.findUnique({
    where: { locationName },
  });
  if (!location) {
    throw new Error("Location not found");
  }

  const existingProperty = await prisma.properties.findFirst({
    where: {
      userId,
      categoryId: category.categoryId,
      locationId: location.locationId,
      ...restPayload,
      amenities: { equals: restPayload.amenities },
      images: { equals: restPayload.images },
    },
  });

  if (existingProperty) {
    throw new Error("Property already exists");
  }

  const createdProperty = await prisma.properties.create({
    data: {
      userId,
      categoryId: category.categoryId,
      locationId: location.locationId,
      ...restPayload,
    },
  });

  return createdProperty;
};

export const landlordService = {
  createProperty,
};
