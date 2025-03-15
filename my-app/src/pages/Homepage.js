import React from "react";
import styles from "../Styles/Homepage.module.css";
const HomePage = () => {
  return (
    <main className={styles.main_content}>
      <div>
        <div className={styles.header_part}>
          <h1 className={styles.align_center}>Dive into Travel Tales</h1>
          <p className={styles.header_content}>
            Welcome to Trip Trove, your ultimate destination for sharing and
            discovering the world, one story at a time! Whether you're an avid
            explorer, a weekend wanderer, or someone dreaming of their next
            adventure, this is the place where journeys come alive. Share your
            favorite travel moments, from hidden gems in bustling cities to
            serene escapes in nature's lap. Connect with fellow travelers,
            exchange tips, and inspire others to embark on their own adventures.
            Together, let's create a vibrant tapestry of cultures, landscapes,
            and experiences that celebrate the beauty of our world. So pack your
            stories, and let the exploration begin!
          </p>
          <div className={styles.card_container}>
            <div className={styles.card}>
              <div className={styles.img_continer}>
                <img
                  className={styles.imgs}
                  src="https://media.istockphoto.com/id/883731480/photo/young-woman-using-laptop-on-a-beach.webp?b=1&s=170667a&w=0&k=20&c=4oc6Tkv8sps6fwdZO7vxtrTqkFmFHXnB0-dEy597-Uk="
                ></img>
              </div>
              <div className={styles.card_content}>
                Your travel blog can inspire countless readers to explore new
                destinations, step out of their comfort zones, and experience
                different cultures. This inspiration can lead to unforgettable
                life experiences for your audience.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.img_continer}>
                <img
                  className={styles.imgs}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTikoZTvWqUi5Ncleq-Edt04CpEL2cs5nAFoHB_8gUQ8Rh97gkiWuzY8RM4uS3mtgKqrpk&usqp=CAU"
                ></img>
              </div>
              <div className={styles.card_content}>
                A travel blog can foster a community of like-minded travel
                enthusiasts who can share their experiences, advice, and support
                each other. This community aspect can be facilitated through
                comments, forums, or social media groups.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.img_continer}>
                <img
                  className={styles.imgs}
                  src="https://www.theprofessionalvagabond.com/wp-content/uploads/2016/05/My-50-favourite-travel-blogs-1.jpg"
                ></img>
              </div>
              <div className={styles.card_content}>
                By sharing practical travel tips, itineraries, and guides, you
                can help your readers plan their trips more effectively. This
                can include advice on budgeting, packing, navigating local
                transportation, and must-see attractions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
