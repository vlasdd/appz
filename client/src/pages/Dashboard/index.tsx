import InfoContainer from "./components/InfoContainer";

const Dashboard = () => {
  return (
    <div className="w-full h-screen bg-[#C8BCF6] flex p-[32px] pt-[96px] flex-col justify-start gap-8">
      <p className="text-2xl font-medium ml-8">
        Dashboard
      </p>
      <div className="w-full h-[50%] flex gap-16 flex-wrap justify-center">
        <InfoContainer
          title="Development"
          description="Explore tools and resources for your coding journey. Enhance your programming skills with the latest tutorials and projects."
          path="/development"
        />
        <InfoContainer
          title="Testing"
          description="Ensure quality and reliability with our comprehensive testing guides and resources. Master the best practices in software testing and debugging."
          path="/testing"
        />
        <InfoContainer
          title="Designing"
          description="Unleash your creativity with design resources and inspiration. Learn new techniques and stay updated with the latest design trends."
          path="/designing"
        />
        <InfoContainer
          title="Statistics"
          description="Dive into insightful data on learning trends and patterns. Monitor your progress and achievements through detailed analytics."
          path="/statistics"
        />
        <InfoContainer
          title="Courses"
          description="Access a wide range of courses to boost your knowledge and skills. From beginner to advanced levels, find the perfect course for your learning journey."
          path="/courses"
        />
      </div>
    </div>
  )
}

export default Dashboard;