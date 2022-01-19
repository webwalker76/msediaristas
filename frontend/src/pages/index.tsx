import { GetStaticProps } from "next";
import Presentation from "@partials/index/_Presentation";
import Advantages from "@partials/index/_Advantages";
import FrequentQuestions from "@partials/index/_Frequent-questions";
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { title: "Meu título" },
  };
};

export default function Index() {
  return (
    <div>
      <Presentation />
      <Advantages />
      <FrequentQuestions />
    </div>
  );
}
