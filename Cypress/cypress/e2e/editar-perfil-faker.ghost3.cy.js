import { faker } from '@faker-js/faker'
import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Editar Perfil validacion', () => {
  let pageFactory;

  before(() => {
    cy.request('/').then((response) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(response.body, 'text/html')
      const version = doc.querySelector('meta[name="generator"]').content
      pageFactory = new PageFactory(version)
      return version
    }).should('contain', 'Ghost')
  }) 

  beforeEach(() => {
    PageBase.resetStepCounter(); 
  })

  it('ESC22 - Edit Profile with invalid Twitter Url', () => {
    faker.seed(1022);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the twitter
        .fillTwitter(faker.internet.url())
        // And I save
        .save()
        // Then it is not saved
        .should('be.false')
    })
  })

  it('ESC23 - Edit Profile with invalid Facebook Url', () => {
    faker.seed(1023);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the Facebook url
        .fillFacebook(faker.internet.url())
        // And I save
        .save()
        // Then it is saved
        .should('be.false')
    })  
  })

  it('ESC24 - Edit Profile with invalid Website', () => {
    faker.seed(1024);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in website
        .fillWebsite(faker.lorem.slug())
        // And I save
        .save() 
        // Then it is saved
        .should('be.false')
    })
  })

  it('ESC126 - Validate min password length', () => {
    faker.seed(1014);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)
    
    // When I navigate to the staff page
    const staffList = pageFactory.navigation().goToStaff();

    const passwordMin =faker.internet.password(8);
    const passwordConfirm =faker.internet.password(20);

    // And select the first user
  staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
  const editProfile = staffList.editProfile(existingUsername);

  //editProfile.fillOldPassword(Cypress.env('password'));
  editProfile.fillConfirmPassword(passwordConfirm);
  editProfile.fillPassword(passwordMin);

  editProfile.changePassword().then(() => {
    cy.get('.form-group.error p.response').eq(0).should('contain', 'Password must be at least 10 characters long');
        });
    });
  })

  it('ESC127 - Validate min confirm password length', () => {
    faker.seed(1014);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)
    
    // When I navigate to the staff page
    const staffList = pageFactory.navigation().goToStaff();

    const passwordMin =faker.internet.password(20);
    const passwordConfirm =faker.internet.password(8);

    // And select the first user
  staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
  const editProfile = staffList.editProfile(existingUsername);

 // editProfile.fillOldPassword(Cypress.env('password'));
  editProfile.fillConfirmPassword(passwordConfirm);
  editProfile.fillPassword(passwordMin);

  editProfile.changePassword().then(() => {
    cy.get('.form-group.error p.response').eq(0).should('contain', 'Your new passwords do not match');
        });
    });
  })

  it('ESC128 - Validate max password length', () => {
    faker.seed(1014);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)
    
    // When I navigate to the staff page
    const staffList = pageFactory.navigation().goToStaff();

    const passwordMin =faker.internet.password(1200);

    // And select the first user
  staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
  const editProfile = staffList.editProfile(existingUsername);

  //editProfile.fillOldPassword(Cypress.env('password'));
  editProfile.fillConfirmPassword(passwordMin);
  editProfile.fillPassword(passwordMin);

  editProfile.changePassword().then(() => {
   
        });
  
  faker.seed(4000);
  //editProfile.fillOldPassword(passwordMin);
  editProfile.fillConfirmPassword(Cypress.env('password'));
  editProfile.fillPassword(Cypress.env('password'));
   
  editProfile.changePassword().then(() => {
     
          });
     
    });
    faker.seed(4000);
  })

  it('ESC129 - Validate max Bio 10000 length', () => {
    faker.seed(1014);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)
    
    // When I navigate to the staff page
    const staffList = pageFactory.navigation().goToStaff();

    const text = faker.lorem.paragraph(201);

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
    const editProfile = staffList.editProfile(existingUsername);

      editProfile
      // And I fill in the biography
      .fillBio(faker.lorem.lines(201))
      // And I save
      .save()
      // Then it is saved
      .should('be.false')
    })
  })


})