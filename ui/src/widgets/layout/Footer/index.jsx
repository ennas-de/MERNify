
const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="footer">
      <h6>&copy; MERNify {currentYear}</h6>
    </div>
  );
};

export default Footer;
