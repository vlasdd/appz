import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const courses = [
  {
    title: "Complete Course On After Effects",
    description:
      "Learn after effects and receive experience of 10 years of making motion graphics...",
    rating: 4.4,
    reviews: 160,
    duration: "11 total hours",
    imageUrl: "./images/test_course.png", // локальний шлях до зображення
  },
  {
    title: "Complete Course On After Effects",
    description:
      "Learn after effects and receive experience of 10 years of making motion graphics...",
    rating: 4.4,
    reviews: 160,
    duration: "11 total hours",
    imageUrl: "./images/test_course.png",
  },
  {
    title: "Complete Course On After Effects",
    description:
      "Learn after effects and receive experience of 10 years of making motion graphics...",
    rating: 4.4,
    reviews: 160,
    duration: "11 total hours",
    imageUrl: "./images/test_course.png",
  },
  {
    title: "Complete Course On After Effects",
    description:
      "Learn after effects and receive experience of 10 years of making motion graphics...",
    rating: 4.4,
    reviews: 160,
    duration: "11 total hours",
    imageUrl: "./images/test_course.png",
  },
];

export default function CoursesList() {
  return (
    <div className="w-full h-full bg-[#C8BCF6] flex p-[32px] pt-[96px] flex-col justify-start gap-8">
      <p className="text-2xl font-medium ml-8">Courses</p>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "white", // білий фон для контейнера
          borderRadius: 2, // округлені краї
          boxShadow: 2, // тінь для карток
        }}
      >
        <Grid container spacing={2} direction="column">
          {courses.map((course, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex", // використовується flex для горизонтального розташування
                  alignItems: "center", // вирівнювання по вертикалі
                  padding: 2,
                  marginBottom: 2,
                  borderBottom: index < courses.length - 1 ? "1px solid #ddd" : "none", // лінія між картками
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 250,
                    height: 150,
                    marginRight: 2, // відступ праворуч
                  }}
                  image={course.imageUrl}
                  alt={course.title}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {course.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {course.rating} ⭐ ({course.reviews} reviews)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
