const prisma = require("../config/db.js");


const createMember = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
    } = req.body;

    const existingMember = await prisma.member.findUnique({
      where: {
        email,
      },
    });

    if (existingMember) {
      return res.status(409).json({
        message: "Member with this email already exists",
      });
    }

    const member = await prisma.member.create({
      data: {
        name,
        email,
        phone,
      },
    });

    res.status(201).json({
      message: "Member created successfully",
      member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create member",
    });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "Members fetched successfully",
      members,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch members",
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const member = await prisma.member.findUnique({
      where: {
        id,
      },
      include: {
        issuedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member fetched successfully",
      member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch member",
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      email,
      phone,
    } = req.body;

    const existingMember = await prisma.member.findUnique({
      where: {
        id,
      },
    });

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // Check email belongs to another member
    if (email && email !== existingMember.email) {
      const emailExists = await prisma.member.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        return res.status(409).json({
          message: "Another member already uses this email",
        });
      }
    }

    const member = await prisma.member.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
      },
    });

    res.status(200).json({
      message: "Member updated successfully",
      member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update member",
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const member = await prisma.member.findUnique({
      where: {
        id,
      },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    const issuedBook = await prisma.issuedBook.findFirst({
      where: {
        memberId: id,
      },
    });

    if (issuedBook) {
      return res.status(400).json({
        message:
          "Cannot delete this member because they have issue records",
      });
    }

    await prisma.member.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete member",
    });
  }
};

// search memmber

// SEARCH MEMBERS

const searchMembers = async (req, res) => {
    try {

        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                message: "Please provide a search value",
            });
        }


        const members = await prisma.member.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        phone: {
                            contains: search,
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
        });


        res.status(200).json({
            message: "Members searched successfully",
            data: members,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// FILTER MEMBERS

const filterMembers = async (req, res) => {
    try {

        const { hasIssuedBooks } = req.query;


        // Check filter value
        if (
            hasIssuedBooks !== "true" &&
            hasIssuedBooks !== "false"
        ) {
            return res.status(400).json({
                message: "hasIssuedBooks must be true or false",
            });
        }


        let where = {};


        
        // MEMBERS WITH ISSUED BOOKS
        if (hasIssuedBooks === "true") {

            where = {
                issuedBooks: {
                    some: {
                        status: "ISSUED",
                    },
                },
            };

        }


        
        // MEMBERS WITHOUT ISSUED BOOKS
        if (hasIssuedBooks === "false") {

            where = {
                issuedBooks: {
                    none: {
                        status: "ISSUED",
                    },
                },
            };

        }

        const members = await prisma.member.findMany({
            where,
            include: {
                issuedBooks: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });


        res.status(200).json({
            message: "Members filtered successfully",
            data: members,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// PAGINATE MEMBERS
const paginateMembers = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 5,
        } = req.query;


        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);


        
        // VALIDATE PAGE AND LIMIT      
        if (
            isNaN(pageNumber) ||
            isNaN(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1
        ) {
            return res.status(400).json({
                message: "Page and limit must be positive numbers",
            });
        }

        
        // CALCULATE SKIP       
        const skip = (pageNumber - 1) * limitNumber;


        
        // GET MEMBERS
        const members = await prisma.member.findMany({
            skip,
            take: limitNumber,
            orderBy: {
                createdAt: "desc",
            },
        });

        // GET TOTAL MEMBERS
        const totalMembers = await prisma.member.count();

        // CALCULATE TOTAL PAGES     
        const totalPages = Math.ceil(
            totalMembers / limitNumber
        );


        res.status(200).json({
            message: "Members fetched successfully",
            data: members,
            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalMembers,
                totalPages,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createMember,
    getMembers,
    getMemberById,
    updateMember,
    deleteMember,
    searchMembers,
    filterMembers,
    paginateMembers,
};