import { Helmet } from "react-helmet-async";

const About = () => (
  <>
    <Helmet><title>About Us — BandhanBD</title></Helmet>
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About BandhanBD</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        BandhanBD is Bangladesh's trusted matrimonial platform dedicated to helping
        individuals find meaningful, lifelong partnerships. We combine modern technology
        with traditional values to create a safe, respectful environment for biodata
        browsing and connecting.
      </p>
      <p className="text-gray-600 leading-relaxed">
        Our platform is built on the belief that every person deserves to find a
        compatible partner. With thousands of verified biodata profiles across all
        seven divisions of Bangladesh, we are proud to have facilitated countless
        successful marriages.
      </p>
    </div>
  </>
);

export default About;