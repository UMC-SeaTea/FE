import img1 from '../../../assets/images/loading/loading1.png';
import img2 from '../../../assets/images/loading/loading2.png';
import img3 from '../../../assets/images/loading/loading3.png';
import pot from '../../../assets/images/loading/loadingPot.png';
import './loadingAnimate.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-wrapper pt-[248px]">
      <div className="frame-container">
        <img className="loading-frame frame1" src={img1} />
        <img className="loading-frame frame2" src={img2} />
        <img className="loading-frame frame3" src={img3} />
      </div>

      <img src={pot} alt="loading pot" className="w-[78px] h-[47px]" />
    </div>
  );
};

export default LoadingSpinner;
