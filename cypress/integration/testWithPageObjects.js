// testWithPageObjects
import { navigateTo } from "../support/page_objects/navigationPage"

    describe('Test with Page Objects', () => {

        beforeEach('open application', () => {
            cy.visit('/')
    })

    it('verify navigations across the page', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.toolTipPage()
        navigateTo.toasterPage()
    })
})