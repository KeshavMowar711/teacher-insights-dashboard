const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const realData = [
  { teacher_id: "T004", teacher_name: "Vikas Nair", class_name: "10", subject: "Social Studies", activity_type: "quiz", created_at: new Date("2026-02-12T19:07:41") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "7", subject: "English", activity_type: "assessment", created_at: new Date("2026-02-13T15:31:51") },
  { teacher_id: "T004", teacher_name: "Vikas Nair", class_name: "10", subject: "Social Studies", activity_type: "lesson", created_at: new Date("2026-02-11T19:15:55") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "7", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-17T20:35:33") },
  { teacher_id: "T004", teacher_name: "Vikas Nair", class_name: "9", subject: "Social Studies", activity_type: "assessment", created_at: new Date("2026-02-15T16:51:32") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "6", subject: "English", activity_type: "quiz", created_at: new Date("2026-02-14T15:22:29") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "10", subject: "Mathematics", activity_type: "quiz", created_at: new Date("2026-02-12T12:26:22") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "9", subject: "Science", activity_type: "quiz", created_at: new Date("2026-02-17T09:21:32") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "9", subject: "Science", activity_type: "assessment", created_at: new Date("2026-02-12T11:38:24") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "6", subject: "English", activity_type: "assessment", created_at: new Date("2026-02-17T19:07:47") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "10", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-11T17:53:57") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "8", subject: "Mathematics", activity_type: "assessment", created_at: new Date("2026-02-16T11:26:52") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "7", subject: "English", activity_type: "lesson", created_at: new Date("2026-02-16T15:41:50") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "10", subject: "Mathematics", activity_type: "assessment", created_at: new Date("2026-02-11T17:54:16") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "8", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-17T19:19:56") },
  { teacher_id: "T004", teacher_name: "Vikas Nair", class_name: "9", subject: "Social Studies", activity_type: "quiz", created_at: new Date("2026-02-16T19:12:33") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "8", subject: "Mathematics", activity_type: "assessment", created_at: new Date("2026-02-13T09:16:06") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "6", subject: "English", activity_type: "quiz", created_at: new Date("2026-02-15T11:36:03") },
  { teacher_id: "T004", teacher_name: "Vikas Nair", class_name: "9", subject: "Social Studies", activity_type: "lesson", created_at: new Date("2026-02-11T13:06:29") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "10", subject: "Mathematics", activity_type: "quiz", created_at: new Date("2026-02-15T13:31:42") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "8", subject: "Mathematics", activity_type: "assessment", created_at: new Date("2026-02-16T11:44:31") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "8", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-18T18:45:43") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "10", subject: "Mathematics", activity_type: "assessment", created_at: new Date("2026-02-12T19:19:44") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "8", subject: "Science", activity_type: "quiz", created_at: new Date("2026-02-14T13:57:07") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "8", subject: "Science", activity_type: "assessment", created_at: new Date("2026-02-12T18:01:59") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "7", subject: "Mathematics", activity_type: "assessment", created_at: new Date("2026-02-14T10:36:09") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "8", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-18T16:32:47") },
  { teacher_id: "T004", teacher_name: "Vikas Nair", class_name: "10", subject: "Social Studies", activity_type: "quiz", created_at: new Date("2026-02-15T15:59:00") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "8", subject: "Science", activity_type: "lesson", created_at: new Date("2026-02-15T13:31:36") },
  { teacher_id: "T004", teacher_name: "Vikas Nair", class_name: "9", subject: "Social Studies", activity_type: "lesson", created_at: new Date("2026-02-15T16:32:23") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "6", subject: "English", activity_type: "assessment", created_at: new Date("2026-02-18T09:12:05") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "9", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-18T16:26:04") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "9", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-16T17:14:47") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "6", subject: "English", activity_type: "assessment", created_at: new Date("2026-02-12T17:47:58") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "10", subject: "Mathematics", activity_type: "quiz", created_at: new Date("2026-02-18T14:05:20") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "8", subject: "Science", activity_type: "quiz", created_at: new Date("2026-02-14T09:54:01") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "9", subject: "Science", activity_type: "lesson", created_at: new Date("2026-02-12T18:27:09") },
  { teacher_id: "T001", teacher_name: "Anita Sharma", class_name: "8", subject: "Mathematics", activity_type: "quiz", created_at: new Date("2026-02-14T15:43:38") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "8", subject: "Science", activity_type: "lesson", created_at: new Date("2026-02-18T15:48:08") },
  { teacher_id: "T002", teacher_name: "Rahul Verma", class_name: "9", subject: "Science", activity_type: "lesson", created_at: new Date("2026-02-16T13:31:34") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "6", subject: "English", activity_type: "lesson", created_at: new Date("2026-02-14T19:49:54") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "10", subject: "Mathematics", activity_type: "quiz", created_at: new Date("2026-02-14T11:55:18") },
  { teacher_id: "T003", teacher_name: "Pooja Mehta", class_name: "6", subject: "English", activity_type: "lesson", created_at: new Date("2026-02-16T15:33:27") },
  { teacher_id: "T005", teacher_name: "Neha Kapoor", class_name: "9", subject: "Mathematics", activity_type: "lesson", created_at: new Date("2026-02-18T11:51:37") }
];

async function main() {
  await prisma.teacherActivity.deleteMany();
  console.log("Cleared old data from database.");

  let inserted = 0;
  for (const data of realData) {
    try {
      await prisma.teacherActivity.create({
        data: data
      });
      inserted++;
    } catch (error) {
      console.log(`Skipped duplicate for ${data.teacher_name}`);
    }
  }
  console.log(`Successfully inserted ${inserted} records.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });