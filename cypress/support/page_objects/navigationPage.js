

function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then( menu =>{
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if( attr.includes('left')){
                cy.wrap(menu).click
            }
        })
    })
}

// Create a new class and assign it to object
export class NavigationPage{

    // methods
    formLayoutsPage(){
       selectGroupMenuItem('Form')
       cy.contains('Form Layouts').click()
    }

    datePickerPage(){
       selectGroupMenuItem('Form')
       cy.contains('Datepicker').click()
    }

    toasterPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    toolTipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

}

// Create a new instance of the class and assign it to object
export const navigateTo = new NavigationPage()