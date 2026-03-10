import Header from "@/components/layout/Header";
import FirstSection from "@/sections/article/FirstSection";
import SecondSection from "@/sections/article/SecondSection";


export default function Article() {
  return (
    <>
      <Header position={"fixed"} bgColor={"#00000056"} fontColor={"#ffffffdd"} dividerColor={"#ffffff"}></Header>
      <FirstSection></FirstSection>
      <SecondSection></SecondSection>
    </>
  );
}