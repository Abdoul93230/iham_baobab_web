import React from 'react';
const ServicePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white " style={styles.service}>
      <h1 className="text-2xl md:text-3xl font-bold text-center  ">
        La page sera bientôt disponible !
      </h1>
    </div>
  );
};

export default ServicePage;

const styles = {
  service : {
    height: "80vh",
    margin: 0,
    overflow: 'hidden'
  }
}
