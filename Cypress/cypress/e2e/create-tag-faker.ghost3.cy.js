import { faker } from '@faker-js/faker'
import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Create tag tests', () => {
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

  it('ESC130 - Create a tag with a name longer than 200  words', () => {
    faker.seed(1007);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    const tagName = faker.lorem.words(200);

    createTag
      // And I fill in the name
      .fillName(tagName)
      // And I save
      .save()
      // Then it is saved
      .should('be.false')

  })

  it('ESC131 - Create a tag with a Slug longer than 200  words', () => {
    faker.seed(1007);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    const tagName = faker.lorem.words(10);
    const tagSlug = faker.lorem.words(200);

    createTag
      // And I fill in the name and slug
      .fillName(tagName)
      .fillSlug(tagSlug)
      // And I save
      .save()
      // Then it is saved
      .should('be.false')

  })

  it('ESC132 - Create a tag with long name after real name can not saved', () => {
    faker.seed(1007);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    const tagName = faker.lorem.words(200);
    const tagSlug = faker.lorem.words(2);

    createTag
      // And I fill in the name and slug
      .fillName(tagName)
      // And I save
      .save()
      // Then it is saved
      .should('be.false')

      faker.seed(2000);
  createTag
      // And I fill in the name and slug
      .fillNameEmpty()
      .fillName(faker.lorem.words(1))
      // And I save
      .saveRetry()
      // Then it is saved
      .should('be.false')
    })
})
