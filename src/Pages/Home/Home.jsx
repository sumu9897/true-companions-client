import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner";
import Premium from "../../components/Premium";
import Works from "./Works";
import SuccessCounter from "./SuccessCounter";
import SuccessStory from "./SuccessStory";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BandhanBD — Find Your Life Partner</title>
      </Helmet>
      <Banner />
      <Premium />
      <Works />
      <SuccessCounter />
      <SuccessStory />
    </>
  );
};

export default Home;