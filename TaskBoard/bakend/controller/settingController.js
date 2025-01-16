const UserModel = require("../model/userModel");
const nodemailer = require("nodemailer");

const generateReferralCode = async () => {
  const otp = Math.floor(Math.random() * 10000 + 1).toString();
  return otp;
};

exports.sendReferral = async (req, res) => {
  try {
    const randomReferralCode = await generateReferralCode();
    const { email, referralCode = randomReferralCode } = req.body;

    console.log("Sending referral code:", email, referralCode);

    const auth = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "akshayrjc1996@gmail.com",
        pass: "ljcx ivrt omvw gile",
      },
    });

    const receiver = {
      from: "akshayrjc1996@gmail.com",
      to: email,
      subject: "Referral code is",
      text: `Your referral code :- ${referralCode}`,
    };

    const emailResponse = await auth.sendMail(receiver);
    console.log("Email sent:", emailResponse);
    res.json({ message: `Referral code sent to ${email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReferredUsers = async (req, res) => {
  try {
    const { email, referralCode } = req.body;
    console.log("Fetching referred users:", email, referralCode);

    const users = await UserModel.aggregate([
      // Step 1: Lookup the users with the same referralCode as refCode
      {
        $lookup: {
          from: "users", // Same collection to reference
          localField: "referralCode", // Current user's referralCode
          foreignField: "refCode", // Other users' refCode
          as: "referredUsers", // Output field containing the matching referred users
        },
      },
      // Step 2: Filter to include only the current user and those whose refCode matches referralCode
      {
        $match: {
          referralCode: referralCode, // Ensure we're looking for the correct user's referralCode
        },
      },
      // Step 3: Project the data to include current user and referred users
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          referralCode: 1,
          refCode: 1,
          referredUsers: 1, // Include referred users in the response
        },
      },
    ]);

    // If no users found, send a message
    if (users.length === 0) {
      return res.status(404).json({
        message: `No users found with referral code: ${referralCode}`,
      });
    }

    // Send a response with both the referral email sent and the matching users found
    res.status(200).json({
      message: `Referral code sent to ${email}`,
      referredUsers: users, // List of users with matching referralCode and refCode
    });
  } catch (error) {
    console.error("Error fetching referred users:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
