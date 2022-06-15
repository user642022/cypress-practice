///<reference types="cypress" />

const { clear } = require("console")
const { last } = require("rxjs/operators")

describe('Our First suite',() => {

        it('some test name', () => {

            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()

            // WAYS TO IDENTIFY LOCATORS USING CYPRESS

            // by Tag Name
            cy.get('input')

            // by ID
            cy.get('#inputEmail1')

            // by Class name NOTE: put a . in front of class name to tell cypress this is a class name
            cy.get('.input-full-width')

            // by Attribute name NOTE: must put Attribute name in []
            cy.get('[placeholder]')

            // by Attribute name and value
            cy.get('[placeholder="Email"]')

            // by Class value
            cy.get('[class="input-full-width size-medium shape-rectangle"]')

            // by Tag name and Attribute with value
            cy.get('input[placeholder="Email"]')

            // by two different attributes. One attribute with value and the other just attribute name
            cy.get('[placeholder="Email"][fullwidth]')

            // by Tag name, Attribute with value, ID and Class name
            cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

            // The most recommended by Cypress. Create your own locators
            cy.get('[data-cy="imputEmail1"]')
        })

        // TOOLTIPS 
        it('Tooltips', () => {
            cy.visit('/')
            cy.contains('Modal & Overlays').click()
            cy.contains('Tooltip').click()

            cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
            cy.get('nb-tooltip').should('contain', 'This is a tooltip')

            cy.contains('nb-card', 'Colored Tooltips').contains('Primary').click()
            cy.get('nb-tooltip').should('contain', 'This is a tooltip')

        })

        // POPUPS 
        it('Dialog boxes', () => {
            cy.visit('/')
            cy.contains('Tables & Data').click()
            cy.contains('Smart Table').click()
    
            // confirm the actual text in pop up
            const stub = cy.stub()
            cy.on('window:confirm', stub)
            cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')

            cy.get('tbody tr').first().find('.nb-trash').click()
            cy.on('window:confirm',() => false)

            })

        })

        it('second test', () => {

            cy.visit('/')
            cy.contains('Forms').click()

            cy.contains('Form Layouts').click()

            cy.get('[data-cy="signInButton"]')

            cy.contains('Sign in')

            cy.contains('[status="warning"]', 'Sign in')

            cy.get('#inputEmail3')   /// .get method searches in the entire DOM
            .parents('form')
            .find('button')         /// .find method is to find the child element from the parent elements
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

            cy.contains('nb-card', 'Form without labels').find('[placeholder="Message"]')  /// .contains by text and web selector will find only one web element
            
            cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

        })

        // THEN AND WRAP METHODS
        it('then and wrap methods', () => {

            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()

            // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
            // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
            
            // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
            // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')
        

            cy.contains('nb-card', 'Using the Grid').then( firstForm => {
                const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
                const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

                expect(emailLabelFirst).to.equal('Email')
                expect(passwordLabelFirst).to.equal('Password')
           
        // Verify that Using the Grid password label is same as Basic form password label
        
            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordSecondText)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
           
            })

        })

        // USING INVOKE CYPRESS METHOD EXAMPLES

        it('invoked command', () => {
            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
            
        // 1 example
            cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')


        // 2 example
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        // 3 example, how to get text value from web app using the invoked command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')

        })
       
    })

    // DATE PICKER 
        it('assert property', () => {

            function selectDayFromCurrent(day){
                let date = new Date()
                date.setDate(date.getDate() + day)
                let futureDay = date.getDate()
                let futureMonth = date.toLocaleString('default', {month: 'short'})
                let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                    if(!dateAttribute.includes(futureMonth)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(day)
                    } else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    }
                })
                return dateAssert
            }

            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Datepicker').click()

            cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
                cy.wrap(input).click()
                let dateAssert = selectDayFromCurrent(1)
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            })
        })

        // CHECKBOXES AND RADIO BUTTONS
        // TEST SCENARIOS
        //1 Check first radio button
        //2 Click second radio button and verify first radio button is not selected
        //3 Verify that third radio button is disabled.

        it('radio button', () => {
            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()

            cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
                cy.wrap(radioButtons)
                    .first()
                    .check({force: true}) 
                    .should('be.checked')

                cy.wrap(radioButtons)
                    .eq(1)
                    .check({force: true})
                    .should('be.checked')
                
                    cy.wrap(radioButtons)
                    .eq(0)
                    .should('not.be.checked')

                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled')     
            })

        })
        // CHECKBOXES
        it('check boxes', () => {
            cy.visit('/')
            cy.contains('Modal & Overlays').click()
            cy.contains('Toastr').click()

            cy.get('[type="checkbox"]').check({force: true})
            cy.get('[type="checkbox"]').eq(0).click({force: true})
            cy.get('[type="checkbox"]').eq(1).click({force: true})
        })


        // LIST AND DROPDOWNS
        it('list and drop-downs', () => {
            cy.visit('/')
        // 1
            cy.get('nav nb-select').click()
            cy.get('.options-list').contains('Dark').click()
            cy.get('nav nb-select').should('contain', 'Dark')
            cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')


        // 2 Verify all items in drop-down list. Cypress will loop through each item and verify 
            cy.get('nav nb-select').then( dropdown => {  // save as a variable 
            cy.wrap(dropdown).click()  // we used 'wrap' when you want to use (or convert) your object to the format that Cypress will understand.
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3) {
                    cy.wrap(dropdown).click()
                }

        })
     })
})

   // WEB TABLES

    it('Web Tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
    // 1 example: how to work with tables(update fields, save values in fields, validate value in fields)
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => { // save tableRow as a parameter to use later
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25') // clears existing value. Then enter new values
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')  // Validates that new value is save
        }) 
  

    // 2 example: add a new table row and verify it was added
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Joe')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bob')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Joe')
            cy.wrap(tableColumns).eq(3).should('contain', 'Bob')
        })

        // 3 example test table search function for Last Names
        const lastname = ['Smith', 'Otto', 'Mario']

        cy.wrap(lastname).each( lastname => {
        cy.get('thead [placeholder="Last Name"]').clear().type(lastname)
        cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(lastname == 'Mario'){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(3).should('contain', lastname)
                }
                      
            })

        })

    })
    
