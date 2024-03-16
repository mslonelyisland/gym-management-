const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors"); // to display the data in a table
// const AdminModel = require("./Admin");
const RegisteredMemberModel = require("./RegisteredMember"); // js file
const GymEquipmentsModel = require("./GymEquipments");
const AttendanceModel = require("./Attendance");
const AdminModel = require("./Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Admin Log In
// app.get("/admin", (req, res) => {
//   AdminModel.find()
//     .then((admin) => res.json(admin))
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });
// // add admin
// app.post("/addadmin", (req, res) => {
//   AdminModel.create(req.body)
//     .then((admin) => res.json(admin))
//     .catch((err) => res.json(err));
// });

// Admin Login
const admin = {
  email: "weluna@gmail.com",
  passwordHash: bcrypt.hashSync("admin", 10) // Simulate a hashed password
};

// POST /admin route for login
app.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  // Simulate password verification
  const passwordMatch = await bcrypt.compare(password, admin.passwordHash);

  if (email === admin.email && passwordMatch) {
    // Generate JWT token
    const token = jwt.sign({ email: admin.email }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ status: "ok", data: token });
  } else {
    // If email or password is incorrect
    res.status(401).json
({ status: "error", message: "Invalid email or password" });
}
});


// retrieve a admin by its ID, working
app.get("/admin/:id", (req, res) => {
  const id = req.params.id;
  AdminModel.findById(id)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json(admin);
    })
    .catch((err) => {
      console.error("Axios error:", err.response || err.message);
      setError(err.response ? err.response.data : err.message);
    });
    
});

// Member Registration
// retrieve all the registered members, working
app.get("/member", (req, res) => {
  const id = req.params.id;
  RegisteredMemberModel.find()
    .then((member) => res.json(member)) // registeredmember is from the model
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

// Attendance of Members
// To record the attendance (check in) of the member by its Id, working
app.post("/attendance/checkin", async (req, res) => {
  try {
    const { memberId } = req.body;
    const member = await RegisteredMemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Create attendance for check-in
    const attendance = await AttendanceModel.create({
      memberId: member._id, // Use member's ID
      action: "check in",
    });

    res.json({ message: "Attendance recorded successfully", attendance });
  } catch (error) {
    console.error("Error recording attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// To record the attendance (check out) of the member by its Id, working
app.post("/attendance/checkout", async (req, res) => {
  try {
    const { memberId } = req.body;
    const member = await RegisteredMemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Create attendance for check-out
    const attendance = await AttendanceModel.create({
      memberId: member._id, // Use member's ID
      action: "check out",
    });

    res.json({ message: "Attendance recorded successfully", attendance });
  } catch (error) {
    console.error("Error recording attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Gym Equipments, get all gym equipments
app.get("/gymequipments", (req, res) => {
  GymEquipmentsModel.find()
    .then((gymequipments) => res.json(gymequipments)) // gymequipments is from the model
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// retrieve a member by its ID, working
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

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});
