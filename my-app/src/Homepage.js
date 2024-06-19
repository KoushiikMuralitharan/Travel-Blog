import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Homepage.css';
const HomePage = () => {
  return (
    <div className='body3'>
    {/* About the Travel Blog Section */}
    <section className="py-5 mt-4">
      <Container>
        <Row className='backgroundimg'>
          <Col md={6}>
            <h2>About Our Travel Blog</h2>
            <p className='dark-text large-text'>
              Welcome to our travel blog! We are passionate about exploring
              the world and sharing our adventures with you. Whether you're
              seeking travel inspiration or practical tips, you'll find
              everything you need to plan your next adventure right here.
            </p>
            <p className='dark-text large-text'>
            Our mission is to inspire and empower travelers to explore new
              destinations, experience different cultures, and create lasting
              memories. Join us on our journey as we uncover the hidden
              gems of the world and share our travel stories with you!
            </p>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Image Cards Section */}
    <section className=" py-5">
      <Container>
        <h2 className="mb-4 text-center">Explore Our Travel Adventures</h2>
       <div>
       <Row className="justify-content-center">
          <Col md={4} className="mb-4 ">
            <Card className='custom-card'>
              <Card.Img variant="top" src="https://media.istockphoto.com/id/883731480/photo/young-woman-using-laptop-on-a-beach.webp?b=1&s=170667a&w=0&k=20&c=4oc6Tkv8sps6fwdZO7vxtrTqkFmFHXnB0-dEy597-Uk=" alt="Image 1" />
              <Card.Body>
                <Card.Text>
                Your travel blog can inspire countless readers to explore new destinations, step out of their comfort zones, and experience different cultures. This inspiration can lead to unforgettable life experiences for your audience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className='custom-card'>
              <Card.Img className='image-container' variant="top" src="https://www.theprofessionalvagabond.com/wp-content/uploads/2016/05/My-50-favourite-travel-blogs-1.jpg" alt="Image 2" height="230px" />
              <Card.Body>
                <Card.Text>
                By sharing practical travel tips, itineraries, and guides, you can help your readers plan their trips more effectively. This can include advice on budgeting, packing, navigating local transportation, and must-see attractions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className='custom-card'>
              <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTikoZTvWqUi5Ncleq-Edt04CpEL2cs5nAFoHB_8gUQ8Rh97gkiWuzY8RM4uS3mtgKqrpk&usqp=CAU" alt="Image 3" />
              <Card.Body>
                <Card.Text>
                A travel blog can foster a community of like-minded travel enthusiasts who can share their experiences, advice, and support each other. This community aspect can be facilitated through comments, forums, or social media groups.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       </div>
      </Container>
    </section>
  </div>
  );
};

export default HomePage;
