require("dotenv").config();
const db = require("../models");
const { User, Department, Student, Faculty, Subject, FacultySubject, Attendance } = db;

async function seed() {
  await db.sequelize.authenticate();
  console.log("Connected. Resetting tables...");
  await db.sequelize.sync({ force: true });

  console.log("Creating department...");
  const cse = await Department.create({ name: "Computer Science and Engineering", code: "CSE" });

  console.log("Creating subjects...");
  const dataStructures = await Subject.create({
    name: "Data Structures", code: "CS301", departmentId: cse.id, semester: 6, credits: 4,
  });
  const operatingSystems = await Subject.create({
    name: "Operating Systems", code: "CS302", departmentId: cse.id, semester: 6, credits: 4,
  });

  console.log("Creating admin...");
  await User.create({
    fullName: "Shaun Menezes",
    email: "admin@campushub.edu",
    password: "admin123",
    role: "admin",
  });

  console.log("Creating faculty...");
  const facultyUser = await User.create({
    fullName: "Meera Rao",
    email: "meera.rao@campushub.edu",
    password: "faculty123",
    role: "faculty",
  });
  const faculty = await Faculty.create({
    userId: facultyUser.id,
    employeeId: "FAC2026014",
    departmentId: cse.id,
    designation: "Associate Professor",
  });

  console.log("Assigning faculty to classes/subjects...");
  await FacultySubject.create({
    facultyId: faculty.id, subjectId: dataStructures.id, departmentId: cse.id, semester: 6, section: "A",
  });
  await FacultySubject.create({
    facultyId: faculty.id, subjectId: operatingSystems.id, departmentId: cse.id, semester: 6, section: "A",
  });

  console.log("Creating students...");
  const studentDefs = [
    { fullName: "Ananya Sharma", email: "ananya.sharma@campushub.edu", usn: "1CS21CS001" },
    { fullName: "Rohan Verma", email: "rohan.verma@campushub.edu", usn: "1CS21CS014" },
    { fullName: "Priya Nair", email: "priya.nair@campushub.edu", usn: "1CS21CS022" },
  ];

  const students = [];
  for (const s of studentDefs) {
    const user = await User.create({
      fullName: s.fullName,
      email: s.email,
      password: "student123",
      role: "student",
    });
    const student = await Student.create({
      userId: user.id,
      usn: s.usn,
      departmentId: cse.id,
      semester: 6,
      section: "A",
    });
    students.push(student);
  }

  console.log("Creating some attendance history...");
  const pastDates = ["2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06"];
  for (const date of pastDates) {
    for (const student of students) {
      const presentChance =
        student.usn === "1CS21CS001" ? 0.95 : student.usn === "1CS21CS014" ? 0.75 : 0.5;

      await Attendance.create({
        studentId: student.id,
        subjectId: dataStructures.id,
        facultyId: faculty.id,
        departmentId: cse.id,
        semester: 6,
        section: "A",
        date,
        status: Math.random() < presentChance ? "present" : "absent",
      });
      await Attendance.create({
        studentId: student.id,
        subjectId: operatingSystems.id,
        facultyId: faculty.id,
        departmentId: cse.id,
        semester: 6,
        section: "A",
        date,
        status: Math.random() < presentChance ? "present" : "absent",
      });
    }
  }

  console.log("\nSeed complete. Test accounts:");
  console.log("  Admin:   admin@campushub.edu   / admin123");
  console.log("  Faculty: meera.rao@campushub.edu / faculty123");
  console.log("  Student: ananya.sharma@campushub.edu / student123");
  console.log("  Student: rohan.verma@campushub.edu / student123");
  console.log("  Student: priya.nair@campushub.edu / student123");

  await db.sequelize.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});