//core
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
//front10 components
import "@front10/landing-page-book/dist/themes/default/index.legacy_browsers.css";

import "./App.css";

import React, { Component } from "react";

import {
	Row,
	Header,
	Container,
	Hero,
	Image,
	Link,
	Column,
	Navbar,
	NavbarCollapse,
	NavbarBrand,
	NavbarNav,
	NavbarLink,
	Features,
	Team,
	BrowserSupport,
	Footer,
	Copyright,
} from "@front10/landing-page-book/dist/components";

import particles from "./data/particles.json";
import features from "./data/features.json";
import team from "./data/team.json";
import browsers from "./data/browsers.json";

class App extends Component {
	render() {	
	return (
		<div>
		    <Navbar expand="md">
		      <NavbarCollapse>
		        <NavbarBrand>
		          <Image
		            alt="Front10 logo"
		            src="images/logo/front10.png"
		            width="40"
		          />
		        </NavbarBrand>
		        <NavbarNav alignItems="right">
		          <NavbarLink>
		            <a href="/">Home</a>
		          </NavbarLink>
		          <NavbarLink>
		            <a href="#features">Features</a>
		          </NavbarLink>
		          <NavbarLink>
		            <a href="#team">Team</a>
		          </NavbarLink>
		          <NavbarLink>
		            <a href="#download">Download</a>
		          </NavbarLink>
		        </NavbarNav>
		      </NavbarCollapse>
		    </Navbar>
            <Hero
              backgroundColor="#212529"
              particlesParams={particles}
              minHeight="50vh"
            >
              <Container>
                <Image
                  alt="Front10 logo"
                  className="main-logo"
                  rounded
                  src="images/logo/front10.png"
                  width="80"
                />
                <Header className="text-warning">PRAMbot</Header>
                <Header className="text-warning" type="h5">
                  Psychological Recommendations for Anxiety and Mindfulness
                </Header>
                <div className="mt-5">
                  <Link
                    className="btn btn-primary btn-started"
                    href="https://front10.com/landing-page-book"
                    target="_blank"
                  >
                    Learn More
                  </Link>
                </div>
              </Container>
            </Hero>
            <div id="features">
            <Features
              features={features}
              imageCircle={false}
              showBorder={false}
              showSubtitle={true}
            />
            </div>
            <div id="team">
	            <Team
	              showBorder={false}
	              members={team}
	              socials={["linkedin", "twitter"]}
	            />
	        </div>
            <div align="center" id="download">
	            <Row>
	            	<Column className="col-sm-12 col-md">
	            		<BrowserSupport browsers={browsers} />
	            	</Column>
	            </Row>
            </div>
	        
            <Footer>
              <Row>
                <Column className="col-sm-12 col-md">
                  <Copyright showAllRightText={false} text="Front10, LLC" />
                </Column>
                <Column className="col-sm-12 col-md mt-3 mt-md-0">
                  <span>With ♥ by </span>
                  <Link href="https://front10.com/" target="_blank">
                    <Image
                      alt="Front 10 logo"
                      src="https://front10.com/img/logos/logo-main.png"
                      width="100"
                    />
                  </Link>
                </Column>
              </Row>
            </Footer>
	      </div>
	);
	}
}

export default App;
