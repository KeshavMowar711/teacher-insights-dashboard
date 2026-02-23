const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/dashboard', async (req, res) => {
  const teacherId = req.query.teacher_id;
  const whereClause = teacherId && teacherId !== 'all' ? { teacher_id: teacherId } : {};

  try {
    const activities = await prisma.teacherActivity.findMany({
      where: whereClause,
      orderBy: { created_at: 'asc' }
    });

    const totals = {
      lessons: activities.filter(a => a.activity_type === 'lesson').length,
      quizzes: activities.filter(a => a.activity_type === 'quiz').length,
      assessments: activities.filter(a => a.activity_type === 'assessment').length,
    };

    const trendsMap = {};
    activities.forEach(act => {
      const date = new Date(act.created_at);
      const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`; 
      
      if (!trendsMap[week]) trendsMap[week] = { name: week, lesson: 0, quiz: 0, assessment: 0 };
      trendsMap[week][act.activity_type] += 1;
    });

    const uniqueTeachers = await prisma.teacherActivity.findMany({
      distinct: ['teacher_id'],
      select: { teacher_id: true, teacher_name: true }
    });

    res.json({
      totals,
      trends: Object.values(trendsMap),
      teachers: uniqueTeachers
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});