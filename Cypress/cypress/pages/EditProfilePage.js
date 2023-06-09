import PageBase from "./PageBase";

class EditProfilePage extends PageBase {
  NAME = "EditProfile";

  fillFullName(value) {
    if (value) {
      cy.get('input#user-name').clear({ force: true }).type(value, { scrollBehavior: 'center' });
      this.screenshot('fillFullName');
    } else {
      cy.get('input#user-name').clear({ force: true });
    }
    
    return this;
  }

  fillSlug(value) {
    cy.get('input[name="user"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillSlug');

    return this;
  }

  getSlug() {
    return cy.get('input[name="user"]');
  }

  fillEmail(value) {
    cy.get('input[name="email"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillEmail');

    return this;
  }

  fillLocation(value) {
    cy.get('input#user-location').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillLocation');

    return this;
  }

  fillLocationEmpty() {
    cy.get('input#user-location').clear({ force: true });
      this.screenshot('fillLocationEmpty');
    return this;
  }


  fillWebsite(value) {
    cy.get('input#user-website').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillWebsite');

    return this;
  }

  fillFacebook(value) {
    cy.get('input[name="user[facebook]"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillFacebook');

    return this;
  }

  fillTwitter(value) {
    cy.get('input[name="user[twitter]"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillTwitter');

    return this;
  }

  fillBio(value) {
    cy.get('textarea#user-bio').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillBio');

    return this;
  }

  fillPassword(value) {
    cy.get('input#user-password-new').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillPassword');
    
    return this;
  }

  fillOldPassword(value) {
    cy.get('input#user-password-old').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillOldPassword');
    
    return this;
  }
  fillConfirmPassword(value) {
    cy.get('input#user-new-password-verification').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillConfirmPassword');
    
    return this;
  }

  save() {
    let button = cy.contains('button', 'Save');
    button.click();

    let result = "";

    return button.invoke('text')
      .should(($text) => {
        result = $text;
        expect($text.trim()).to.be.oneOf(['Retry', 'Saved'])
      })
      .then(() => this.screenshot('save'))
      .then(() => result.trim() === 'Saved')
  }

  getErrorMessage() {
    return cy.get('.error p.response');
  }

  changePassword() {
    let button = cy.contains('button', 'Change Password');
    button.click();

    let result = "";

    return button.invoke('text')
      .should(($text) => {
        result = $text;
        expect($text.trim()).to.be.oneOf(['Retry', 'Saved'])
      })
      .then(() => this.screenshot('ChangePassword'))
      .then(() => result.trim() === 'ChangePassword')
  }
}

export default EditProfilePage;
