import { prisma } from "../../lib/prisma";

const getAllProperty = async (query: Record<string, unknown>) => {
    const {
        searchTerm,
        categoryName,
        locationName,
        minPrice,
        maxPrice,
        minBedrooms,
        minSquarefoot,
        maxSquarefoot,
        isAvailable,
        sortBy,
        sortOrder,
        page,
        limit
    } = query;

    const queryConditions: any[] = [];

    const availableStatus = isAvailable !== undefined ? (isAvailable === 'true' || isAvailable === true) : true;
    queryConditions.push({ isAvailable: availableStatus });

    // 1. Partial Search (including amenities as an exact match in the array)
    if (searchTerm) {
        queryConditions.push({
            OR: [
                { propertyName: { contains: searchTerm as string, mode: 'insensitive' } },
                { address: { contains: searchTerm as string, mode: 'insensitive' } },
                { description: { contains: searchTerm as string, mode: 'insensitive' } },
                { amenities: { has: searchTerm as string } }
            ]
        });
    }

    // 2. Dropdown Filters
    if (categoryName) {
        queryConditions.push({
            category: {
                categoryName: { equals: categoryName as string, mode: 'insensitive' }
            }
        });
    }
    if (locationName) {
        queryConditions.push({
            location: {
                locationName: { equals: locationName as string, mode: 'insensitive' }
            }
        });
    }

    // 3. Range Filters
    if (minPrice || maxPrice) {
        queryConditions.push({
            price: {
                ...(minPrice ? { gte: Number(minPrice) } : {}),
                ...(maxPrice ? { lte: Number(maxPrice) } : {})
            }
        });
    }
    if (minBedrooms) {
        queryConditions.push({
            bedroomCount: { gte: Number(minBedrooms) }
        });
    }
    if (minSquarefoot || maxSquarefoot) {
        queryConditions.push({
            squarefoot: {
                ...(minSquarefoot ? { gte: Number(minSquarefoot) } : {}),
                ...(maxSquarefoot ? { lte: Number(maxSquarefoot) } : {})
            }
        });
    }

    const whereConditions = {
        AND: queryConditions.length > 0 ? queryConditions : undefined
    };

    // 4 & 5. Pagination and Sorting
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const sortField = (sortBy as string) || 'createdAt';
    const sortDir = (sortOrder as string) === 'asc' ? 'asc' : 'desc';

    const result = await prisma.properties.findMany({
        where: whereConditions,
        skip,
        take: limitNumber,
        orderBy: {
            [sortField]: sortDir
        },
        include: {
            category: true,
            location: true,
        }
    });

    const total = await prisma.properties.count({ where: whereConditions });

    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(total / limitNumber)
        },
        data: result
    };
};

const getSingleProperty = async (propertyId:string) => {

    const property = await prisma.properties.findUnique({
        where:{
            propertyId
        },
        include:{
            category:true,
            location:true,
            user:{
                select:{
                    userName:true,
                    email:true,
                    profileImage:true
                }
            }
        }
    })

    if(!property){
        throw new Error("Property not found")
    }

    return property

}

const getCategory = async () => {

    const categories = await prisma.categories.findMany()
    return categories

}
export const propertyService = {
  getAllProperty,
  getSingleProperty,
  getCategory
};