import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-8 text-center text-n-0/90">
        - Institutions that get helped -
      </h5>
      <ul className="flex justify-center" style={{ gap: "10px" }}>
        {companyLogos.slice(0, 3).map((logo, index) => (
          <li
            className="flex items-center justify-center h-[7.5rem]"
            key={index}
          >
            <img
              src={logo}
              width={140}
              height={28}
              alt={`Company Logo ${index + 1}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
