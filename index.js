const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors"); // to display the data in a table
// const AdminModel = require("./Admin");
const RegisteredMemberModel = require("./RegisteredMember"); // js file
const GymEquipmentsModel = require("./GymEquipments");
const AttendanceModel = require("./Attendance");
// const AdminModel = require("./Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const WalkInModel = require("./WalkIn");
const AttendanceWalkInModel = require('./AttendanceWalkIn')

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1/gym_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Db is connected :D"))
  .catch((err) => console.log(err));

  // function to calculate membership status, working
const calculateMembershipStatus = (registrationDate) => {
  const registrationDateObj = new Date(registrationDate);
  const expirationDate = new Date(registrationDateObj.setMonth(registrationDateObj.getMonth() + 1));
  const currentDate = new Date();
  return currentDate > expirationDate ? 'Expired' : 'Active';
  };

// Admin Login, working
const admin = {
  email: "weluna@gmail.com",
  passwordHash: bcrypt.hashSync("admin", 10) // Simulate a hashed password
}; 

// Route to get all members' registration and membership status,working
app.get('/membership', async (req, res) => {
  try {
    const members = await RegisteredMemberModel.find();

    if (!members) {
      return res.status(404).send('Members not found');
    }

    const membersWithStatus = members.map(member => ({
      _id: member._id, // Include the ObjectId
      fullname: member.fullname,
      username: member.username,
      dor: member.dor,
      plan: member.plan,
      membertype: member.membertype,
      membershipStatus: calculateMembershipStatus(member.dor),
    }));
    res.json(membersWithStatus);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send('Server error');
  }
});

// Route to update a member's payment details by ID,working
app.put('/updatepayment/:id', async (req, res) => {
  try {
    const { dor, plan } = req.body; 
    const member = await RegisteredMemberModel.findById(req.params.id);
    if (!member) {
      return res.status(404).send('Member not found');
    }
    // Update the member's payment details
    member.dor = dor;
    member.plan = plan;
    // Save the updated member
    await member.save();
    // Return the updated member details
    res.json({
      _id: member._id,
      fullname: member.fullname,
      username: member.username,
      dor: member.dor,
      plan: member.plan,
      membertype: member.membertype,
      membershipStatus: calculateMembershipStatus(member.dor),
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send('Server error');
  }
});

// Route to get a member's registration and membership status by ID, working
app.get('/membership/:id', async (req, res) => {
  try {
    const member = await RegisteredMemberModel.findById(req.params.id);

    if (!member) {
      return res.status(404).send('Member not found');
    }

    const membershipStatus = calculateMembershipStatus(member.dor);
    res.json({
      _id: member._id, 
      fullname: member.fullname,
      username: member.username,
      dor: member.dor,
      plan: member.plan,
      membertype: member.membertype,
      membershipStatus: membershipStatus,
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// POST /admin route for login
app.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  const passwordMatch = await bcrypt.compare(password, admin.passwordHash);

  if (email === admin.email && passwordMatch) {
    const token = jwt.sign({ email: admin.email });
    res.json({ status: "ok", data: token });
  } else {
    res.status(401).json
({ status: "error", message: "Invalid email or password" });
}
});

// Route to get the attendance, working
app.get("/attendance", (req, res) => {
  const id = req.params.id;
  AttendanceModel.find()
    .then((memberId) => res.json(memberId)) // registeredmember is from the model
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Member Registration,working
// retrieve all the registered members, working
app.get("/member", (req, res) => {
  const id = req.params.id;
  RegisteredMemberModel.find()
    .then((member) => res.json(member)) 
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// retrieve a member by its ID, working
app.get("/member/:id", (req, res) => {
  const id = req.params.id;
  RegisteredMemberModel.findById(id)
    .then((member) => {
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json(member);
    })
    .catch((err) => {
      console.error("Error retrieving member by ID:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});


// register a member, working
app.post("/registermember", (req, res) => {
  RegisteredMemberModel.create(req.body)
    .then((member) => res.json(member))
    .catch((err) => res.json(err));
});

// update a member, working
app.put("/updatemember/:id", (req, res) => {
  const id = req.params.id;
  RegisteredMemberModel.findByIdAndUpdate(
    { _id: id },
    {
      fullname: req.body.fullname,
      username: req.body.username,
      gender: req.body.gender,
      contactnumber: req.body.contactnumber,
      dor: req.body.dor,
      membertype: req.body.membertype,
      plan: req.body.plan,
      amount: req.body.amount,
    }
  )
    .then((member) => res.json(member))
    .catch((err) => res.json(err));
});

// delete a member, working
app.delete("/deletemember/:id", (req, res) => {
  const id = req.params.id;
  RegisteredMemberModel.findByIdAndDelete(id)
    .then(() => res.json({ message: "Member successfully deleted" }))
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});

// working
app.get("/attendance", (req, res) => {
  const id = req.params.id;
  AttendanceModel.find()
    .then((member) => res.json(member)) 
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/attendance/checkin", async (req, res) => {
  try {
    const { memberId } = req.body;
    const time = new Date(); // Current time for check-in
    const member = await RegisteredMemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    // Update member document from RegistereMemberModel with check-in time and status
    await RegisteredMemberModel.findByIdAndUpdate(memberId, {
      $set: {
        checkInTimestamp: time,
        isCheckedIn: true,
      }
    });
    // Create a new attendance record for check-in
    await AttendanceModel.create({
      memberId,
      action: 'check in',
      timestamp: time, 
    });

    res.json({ message: "Check-in recorded successfully", memberId, time });
  } catch (error) {
    console.error("Error recording check-in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/attendance/checkout", async (req, res) => {
  try {
    const { memberId } = req.body;
    const time = new Date(); // Current time for check-out
    const member = await RegisteredMemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Update member document from RegistereMemberModel with check-out time and status
    await RegisteredMemberModel.findByIdAndUpdate(memberId, {
      $set: {
        checkOutTimestamp: time,
        isCheckedIn: false,
      }
    });

    // Create a new attendance record for check-out
    await AttendanceModel.create({
      memberId,
      action: 'check out',
      timestamp: time,
    });

    res.json({ message: "Check-out recorded successfully", memberId, time });
  } catch (error) {
    console.error("Error recording check-out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Gym Equipments, get all gym equipments, working
app.get("/gymequipments", (req, res) => {
  GymEquipmentsModel.find()
    .then((gymequipments) => res.json(gymequipments)) 
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// retrieve a gym equipment by its ID, working
app.get("/gymequipments/:id", (req, res) => {
  const id = req.params.id;
  GymEquipmentsModel.findById(id)
    .then((gymequipments) => {
      if (!gymequipments) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      res.json(gymequipments);
    })
    .catch((err) => {
      console.error("Error retrieving equipment by ID:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// add equipment, working
app.post("/addgymequipments", (req, res) => {
  GymEquipmentsModel.create(req.body)
    .then((gymequipments) => res.json(gymequipments))
    .catch((err) => res.json(err));
});

// update an equipment, working
app.put("/updategymequipments/:id", (req, res) => {
  const id = req.params.id;
  GymEquipmentsModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      amount: req.body.amount,
      purchaseddate: req.body.purchaseddate,
    }
  )
    .then((gymequipments) => res.json(gymequipments))
    .catch((err) => res.json(err));
});

// delete a member, working
app.delete("/deletegymequipments/:id", (req, res) => {
  const id = req.params.id;
  GymEquipmentsModel.findByIdAndDelete(id)
    .then(() => res.json({ message: "Equipment successfully deleted" }))
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});


// Walk In, working
app.get("/walkin", (req, res) => {
  WalkInModel.find()
    .then((attendance_walkin) => res.json(attendance_walkin)) 
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// retrieve a walkin by its ID, working
app.get("/walkin/:id", (req, res) => {
  const id = req.params.id;
  WalkInModel.findById(id)
    .then((attendance_walkin) => {
      if (!attendance_walkin) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      res.json(attendance_walkin);
    })
    .catch((err) => {
      console.error("Error retrieving equipment by ID:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});
// create a walk in, working
app.post("/addwalkin", (req, res) => {
  WalkInModel.create(req.body)
    .then((attendance_walkin) => res.json(attendance_walkin))
    .catch((err) => res.json(err));
});
// delete a walk in, working
app.delete("/deletewalkin/:id", (req, res) => {
  const id = req.params.id;
  WalkInModel.findByIdAndDelete(id)
    .then(() => res.json({ message: "Equipment successfully deleted" }))
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});

app.get("/attendancewalkin", (req, res) => {
  AttendanceWalkInModel.find()
    .then((attendance_walkin) => res.json(attendance_walkin))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/attendance_walkin/checkin", async (req, res) => {
  try {
    const { walkinId } = req.body;
    const time = new Date(); // Current time for check-in
    const walkin = await WalkInModel.findById(walkinId);
    if (!walkin) {
      return res.status(404).json({ error: "walkin not found" });
    }
    // Update walkin document with check-in time and status
    await WalkInModel.findByIdAndUpdate(walkinId, {
      $set: {
        checkInTimestamp: time,
        isCheckedIn: true,
      }
    });
    // Create a new attendance record for the check-in
    await AttendanceWalkInModel.create({
      walkinId,
      action: 'check in',
      timestamp: time,
    });

    res.json({ message: "Check-in recorded successfully", walkinId, time });
  } catch (error) {
    console.error("Error recording check-in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/attendance_walkin/checkout", async (req, res) => {
  try {
    const { walkinId } = req.body;
    const time = new Date(); // Current time for check-out
    const walkin = await WalkInModel.findById(walkinId);
    if (!walkin) {
      return res.status(404).json({ error: "walkin not found" });
    }
    // Update member document with check-out time and status
    await WalkInModel.findByIdAndUpdate(walkinId, {
      $set: {
        checkOutTimestamp: time,
        isCheckedIn: false,
      }
    });
    // Create a new attendance record for check-out
    await AttendanceWalkInModel.create({
      walkinId,
      action: 'check out',
      timestamp: time, 
    });

    res.json({ message: "Check-out recorded successfully", walkinId, time });
  } catch (error) {
    console.error("Error recording check-out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// FOR DATA VISUALIZATION
// Monthly Sales
// Route to fetch monthly sales data, working
app.get('/monthlysales', async (req, res) => {
  try {
    const monthlyData = await RegisteredMemberModel.aggregate([
      {
        $group: {
          _id: { month: { $month: { $dateFromString: { dateString: "$dor" } } } },
          totalSales: { $sum: "$amount" }
        }
      }
    ]);
    res.json(monthlyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// WORKING!!!!!!!!!!!!!!!!!??, march 15 not working
app.get('/activestatus', async (req, res) => {
  try {
    const {memberId} = req.body;
    const number = await RegisteredMemberModel.find(memberId);

    await RegisteredMemberModel.findByIdAndUpdate(memberId, {
      $set: {
        membershipStatus: calculateMembershipStatus
      }
    })
    
    // Filter the members who have active membership status
    const activeMembers = memberId.filter(memberId => memberId.membershipStatus === 'Expired');

    // Get the count of active members
    const count = activeMembers.length;

    // Return the count of active members
    res.json({ count });
  } catch (error) {
    console.error('Error fetching active members count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// STAT BOX
// working
app.get('/activememberscount', async (req, res) => {
  try {
    // Count the number of members where isCheckedIn is true
    const count = await RegisteredMemberModel.countDocuments({ isCheckedIn: true });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching active members count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// working
app.get('/activewalkincount', async (req, res) => {
  try {
    // Count the number of walkin where action is 'check in'
    const count = await WalkInModel.countDocuments({ isCheckedIn: 'true' });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching active walk-in count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// working diay ni siya okay
app.get('/activememberstatus', async (req, res) => {
  try {
    // Find all members with their membership status
    const members = await RegisteredMemberModel.find();

    if (members.length === 0) {
      return res.status(404).send('Members not found');
    }
    const membersWithStatus = members.map(member => ({
      _id: member._id, // Include the ObjectId kay data grid error
      fullname: member.fullname,
      username: member.username,
      dor: member.dor,
      plan: member.plan,
      membertype: member.membertype,
      membershipStatus: calculateMembershipStatus(member.dor),
    }));
    
    // Filter the members who have active membership status
    const activeMembers = membersWithStatus.filter(member => member.membershipStatus === 'Active');

    // Count of active members
    const count = activeMembers.length;

    // Return the count of active members
    res.json({ count });
  } catch (error) {
    console.error('Error fetching active members count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// working 
app.get('/expiredmemberstatus', async (req, res) => {
  try {
    const members = await RegisteredMemberModel.find();

    if (members.length === 0) {
      return res.status(404).send('Members not found');
    }
    const membersWithStatus = members.map(member => ({
      _id: member._id, 
      fullname: member.fullname,
      username: member.username,
      dor: member.dor,
      plan: member.plan,
      membertype: member.membertype,
      membershipStatus: calculateMembershipStatus(member.dor),
    }));
    
    // Filter the members who have active membership status
    const activeMembers = membersWithStatus.filter(member => member.membershipStatus === 'Expired');
    const count = activeMembers.length;
    res.json({ count });
  } catch (error) {
    console.error('Error fetching active members count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/trends", async (req, res) => {
  try {
    const monthlyData = await AttendanceModel.aggregate([
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%m", date: "$timestamp" } }
          },
          totalCheckIns: { $sum: 1 },
        },
      },
    ]);
    res.json(monthlyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
// working
app.get('/genderdata', async (req,res ) => {
  try {
    const data = await RegisteredMemberModel.aggregate([
        {
            $group: {
                _id: "$gender",
                count: { $sum: 1 }
            }
        }
    ]);
    res.json(data);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}
});
// working
app.get('/membertypedata', async (req,res ) => {
  try {
    const data = await RegisteredMemberModel.aggregate([
        {
            $group: {
                _id: "$membertype",
                count: { $sum: 1 }
            }
        }
    ]);
    res.json(data);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Example app listening on port ${PORT}");
});
