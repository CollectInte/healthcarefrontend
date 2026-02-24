import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import WestIcon from "@mui/icons-material/West";
import "./Comparison.css";
import Contactmodal from "./Contactmodal";
import EastIcon from "@mui/icons-material/East";
const Comparison = () => {
  const [open, setOpen] = useState(false);
  const swiperRef = useRef(null);

  return (
    <section className="pricing-section" id="plans">
      <div className="container">
        <div className="section-header">
          <div className="section-label">CareDesk360 Plans</div>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
        </div>

        {/* FREEMIUM */}
        <div className="freemium-card">
          <div className="free-price">
            <h3>Freemium</h3>
            <h2>₹5,000</h2>
          </div>
          <ul>
            <li>Basic Website</li>
            <li>
              Practice Management Software –{" "}
              <b style={{ color: "#46db14" }}>FREE</b>
            </li>
          </ul>
        </div>

        {/* DESKTOP */}
        <div className="plans-desktop">
          <div className="plan-card">
            <div className="plan-header">
              <h3>Growth</h3>
              <h2>₹30,000</h2>
              <p>Quarterly</p>
              <div className="divider" />
              <h4>₹1,00,000</h4>
              <p>Annually</p>
            </div>
            <ul className="plan-features">
              <li>Web application and practice management software.</li>
              <li>
                Social media management and content creation (upto 8 posts per
                month).
              </li>
              <li>Content shoot and training for your team.</li>
              <li>GMB, LinkedIn optimization.</li>
              <li>1 YouTube video every month.</li>
              <li>1 LinkedIn article every month.</li>
              <li>4 blogs every month.</li>
              <li>1 UGC influencer support.</li>
            </ul>
            <button onClick={() => setOpen(true)} className="plan-btn">
              Get Started
            </button>
          </div>

          <div className="plan-card">
            <div className="plan-header">
              <h3>Scale</h3>
              <h2>₹45,000</h2>
              <p>Quarterly</p>
              <div className="divider" />
              <h4>₹1,50,000</h4>
              <p>Annually</p>
            </div>
            <ul className="plan-features">
              <li>Web application and practice management software.</li>
              <li>
                Social media management and content creation upto 12 posts.
              </li>
              <li>Content shoot and training for your team.</li>
              <li>GMB, LinkedIn optimization.</li>
              <li>Everything on basic and standard plan.</li>
              <li>Telecalling support.</li>
              <li>Up to 3 specialities.</li>
              <li>1 YouTube video every month.</li>
              <li>2-3 LinkedIn articles every month.</li>
              <li>6 blogs every month.</li>
              <li>2 UGC influencers.</li>
            </ul>
            <button onClick={() => setOpen(true)} className="plan-btn">
              Get Started
            </button>
          </div>

          <div className="plan-card">
            <div className="plan-header">
              <h3>Legacy</h3>
              <h2>₹45,000</h2>
              <p>Per Month</p>
            </div>
            <ul className="plan-features">
              <li>Everything on scale plan.</li>
              <li>Multi specialities.</li>
              <li>Priority content shoot and training.</li>
              <li>Up to 30 posts creations.</li>
              <li>Dedicated Ad specialist.</li>
              <li>3 YouTube videos every month.</li>
              <li>3 LinkedIn articles every month.</li>
              <li>8 blogs every month.</li>
              <li>4 UGC influencers.</li>
            </ul>
            <button onClick={() => setOpen(true)} className="plan-btn">
              Get Started
            </button>
          </div>
        </div>

        {/* MOBILE — Swiper with custom arrows */}
        <div className="plans-mobile">
          <div className="swiper-container-wrapper">
            {/* CUSTOM LEFT ARROW */}
            <button
              className="custom-arrow custom-arrow-prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <WestIcon />
            </button>

            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 5000, // 3 seconds per slide
                disableOnInteraction: false, // keeps autoplaying after user swipes
              }}
              spaceBetween={0}
              slidesPerView={1}
              autoHeight={true}
              loop={true} // infinite loop
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              <SwiperSlide>
                <div className="plan-card">
                  <div className="plan-header">
                    <h3>Growth</h3>
                    <h2>₹30,000</h2>
                    <p>Quarterly</p>
                    <div className="divider" />
                    <h4>₹1,00,000</h4>
                    <p>Annually</p>
                  </div>
                  <ul className="plan-features">
                    <li>Web application and practice management software.</li>
                    <li>
                      Social media management and content creation (upto 8 posts
                      per month).
                    </li>
                    <li>Content shoot and training for your team.</li>
                    <li>GMB, LinkedIn optimization.</li>
                    <li>1 YouTube video every month.</li>
                    <li>1 LinkedIn article every month.</li>
                    <li>4 blogs every month.</li>
                    <li>1 UGC influencer support.</li>
                  </ul>
                  <button onClick={() => setOpen(true)} className="plan-btn">
                    Get Started
                  </button>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="plan-card">
                  <div className="plan-header">
                    <h3>Scale</h3>
                    <h2>₹45,000</h2>
                    <p>Quarterly</p>
                    <div className="divider" />
                    <h4>₹1,50,000</h4>
                    <p>Annually</p>
                  </div>
                  <ul className="plan-features">
                    <li>Web application and practice management software.</li>
                    <li>
                      Social media management and content creation upto 12
                      posts.
                    </li>
                    <li>Content shoot and training for your team.</li>
                    <li>GMB, LinkedIn optimization.</li>
                    <li>Everything on basic and standard plan.</li>
                    <li>Telecalling support.</li>
                    <li>Up to 3 specialities.</li>
                    <li>1 YouTube video every month.</li>
                    <li>2-3 LinkedIn articles every month.</li>
                    <li>6 blogs every month.</li>
                    <li>2 UGC influencers.</li>
                  </ul>
                  <button onClick={() => setOpen(true)} className="plan-btn">
                    Get Started
                  </button>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="plan-card">
                  <div className="plan-header">
                    <h3>Legacy</h3>
                    <h2>₹45,000</h2>
                    <p>Per Month</p>
                  </div>
                  <ul className="plan-features">
                    <li>Everything on scale plan.</li>
                    <li>Multi specialities.</li>
                    <li>Priority content shoot and training.</li>
                    <li>Up to 30 posts creations.</li>
                    <li>Dedicated Ad specialist.</li>
                    <li>3 YouTube videos every month.</li>
                    <li>3 LinkedIn articles every month.</li>
                    <li>8 blogs every month.</li>
                    <li>4 UGC influencers.</li>
                  </ul>
                  <button onClick={() => setOpen(true)} className="plan-btn">
                    Get Started
                  </button>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* CUSTOM RIGHT ARROW */}
            <button
              className="custom-arrow custom-arrow-next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <EastIcon />
            </button>
          </div>
        </div>

        {/* ADVANCED PLANS */}
        <div className="advanced-plans">
          <div className="advanced-card">
            <div className="advanced-header">
              <h3>Scale Advantage Plus</h3>
              <h2>₹90,000</h2>
              <p>Per Quarter</p>
            </div>
            <ul>
              <li>Everything on scale.</li>
              <li>Guaranteed reach: 1,00,000+ per month.</li>
              <li>Guaranteed views: 3–5 lakh per month.</li>
              <li>Upto 10 Blogs per month.</li>
            </ul>
          </div>
          <div className="advanced-card">
            <div className="advanced-header">
              <h3>Enterprise Starts From</h3>
              <h2>₹1,00,000</h2>
              <p>Per Month</p>
            </div>
            <ul>
              <li>
                Suitable for clinics/hospitals with Ad spend of minimum 3
                lakh/month.
              </li>
              <li>Pricing customized based on features & support.</li>
              <li>Upto 15 Blogs per month.</li>
            </ul>
          </div>
        </div>

        {/* ADD-ONS */}
        <div className="addons-section">
          <h2 className="addons-title">Add-Ons</h2>
          <div className="addons-box">
            <div className="addon-row">
              <div>
                <p>AI clone videos, tailored to your requirements.</p>
              </div>
              <div className="addon-price">Starts from ₹2,500</div>
            </div>
            <div className="addon-row">
              <div>
                <p>
                  Google Ads & Meta Ads management including ad copy creation
                  and campaign handling as per your requirements.
                </p>
                <small>Ad budget to be paid directly by the client.</small>
              </div>
              <div className="addon-price">
                ₹15,000 <span>Per Month</span>
              </div>
            </div>
          </div>
          <div className="pricing-note">
            <p>
              <b>Note:</b> All plans are exclusive of GST and paid advertising
              budget.
            </p>
            <p>
              <b>Caution:</b> Select the plan that aligns with your growth
              goals.
            </p>
          </div>
        </div>
      </div>
      <Contactmodal open={open} handleClose={() => setOpen(false)} />
    </section>
  );
};

export default Comparison;
