import {$$, $, browser, by, element, protractor} from "protractor";

describe('authentication', () => {

  browser.get('/');

  let login_input_fields = $$('page-login .text-input');
  let login_email = login_input_fields.get(0);
  let login_password = login_input_fields.get(1);
  let login_login_form = $('page-login form');

  it('should be login and logout', ()=>{
    login_email.sendKeys("deneme@deneme.com");
    browser.driver.sleep(100);

    login_password.sendKeys("deneme");
    browser.driver.sleep(100);

    login_login_form.submit();
    browser.driver.sleep(100);
    let tabs = $$('ion-tab');
    expect<any>(tabs.count()).toBe(4);


    let menu_button = $('.menu-button');
    menu_button.click().then(()=>{
      browser.driver.sleep(1000);
      let logout_button = $('.logout-button');
      logout_button.click().then(()=>{
        expect<any>(browser.getCurrentUrl()).toBe('http://localhost:8100/#/login');
      })
    })
  });

  it('should signup', ()=> {
    let signup_button = $('.signup-button');
    signup_button.click().then(()=>{

      let signup_input_fields = $$('page-signup .text-input');
      let signup_email = signup_input_fields.get(0);
      let signup_password = signup_input_fields.get(1);
      let signup_repassword = signup_input_fields.get(2);
      let signup_username = signup_input_fields.get(3);

      signup_email.sendKeys("deneme"+Date.now()+"@deneme.com");
      browser.driver.sleep(100);

      signup_password.sendKeys("deneme2");
      browser.driver.sleep(100);

      signup_repassword.sendKeys("deneme2");
      browser.driver.sleep(100);

      signup_username.sendKeys("deneme"+Date.now());
      browser.driver.sleep(100);


      let create_account_button = $('.create-account-button');
      create_account_button.click().then(()=>{
        browser.driver.sleep(3000);
        expect<any>(browser.getCurrentUrl()).toBe('http://localhost:8100/#/y%C3%9C-k-s-e-l-e-n-l-e-r/rising');
      })
    })
  })
});

describe('creating deal', ()=>{


  it('should create deal with url', ()=> {
    browser.get('/')

    browser.driver.sleep(1000);

    let login_input_fields = $$('page-login .text-input');
    let login_email = login_input_fields.get(0);
    let login_password = login_input_fields.get(1);
    let login_login_form = $('page-login form');

    login_email.sendKeys("deneme@deneme.com");
    browser.driver.sleep(100);

    login_password.sendKeys("deneme");
    browser.driver.sleep(100);

    login_login_form.submit();
    browser.driver.sleep(1000);

    let deal_creation_selection_button = $('.deal-creation-selection-button');

    deal_creation_selection_button.click()
      .then(()=>{
      browser.driver.sleep(1000);

      let to_linked_deal_page_button = $('.to-linked-deal-page-button');
      to_linked_deal_page_button.click().then(()=>{

        let create_linked_deal_form = $('page-create-new-deal form');

        let linked_deal_input_fields = $$('page-create-new-deal .text-input');
        let deal_price_input_fields = $$('.deal-price-input')

        //browser.executeScript("document.getElementsByName('deal_url')[1].value='http://www.bukupon.com/diger/18970/rulet-oyunu'");
        let url = linked_deal_input_fields.get(0);
        url.sendKeys("a");
        browser.driver.sleep(3000);


        let price_normal = deal_price_input_fields.get(0);
        price_normal.sendKeys('3000');
        browser.driver.sleep(1000);



        let price_deal = deal_price_input_fields.get(1);
        price_deal.sendKeys('4000');
        browser.driver.sleep(1000);


        let category = element(by.name('selectedCategory'));
        category.click().then(()=>{
          browser.driver.sleep(1000);

          $$('ion-alert button').get(0).click()
            .then(()=>{

              $$('.alert-button-group button').get(1).click().then(()=>{
                browser.driver.sleep(1000);
              })
            });
        });

        let city = element(by.name('selectedCity'));
        city.click().then(()=>{
          browser.driver.sleep(1000);

          $$('ion-alert button').get(0).click()
            .then(()=>{
              $$('.alert-button-group button').get(1).click().then(()=>{
                browser.driver.sleep(1000);
              })
            });
        });

        let coupon = linked_deal_input_fields.get(1);
        coupon.sendKeys('asdfdassd');

        let title = linked_deal_input_fields.get(2);
        title.sendKeys("aslşfjaslşkd"+Date.now());

        let details = linked_deal_input_fields.get(3);
        details.sendKeys("aslşfjaslşkd"+Date.now());

        let starts = $("ion-datetime[name='starts_at'] button");
        starts.click().then(()=>{
          browser.driver.sleep(1000);
          $$('.picker-button').get(1).click().then(()=>{
            browser.driver.sleep(1000);
          })
        });
        let ends = $("ion-datetime[name='finished_at'] button");
        ends.click().then(()=>{
          browser.driver.sleep(1000);
          $$('.picker-button').get(1).click().then(()=>{
            browser.driver.sleep(1000);
          })
        });

        let tags = $('.ng2-tag-input-field');
        tags.sendKeys('lol');

        let create_linked_deal_pictures = $$('.create-linked-deal-picture');
        let create_linked_deal_picture_first = create_linked_deal_pictures.get(0);
        create_linked_deal_picture_first.click().then(()=> {
          browser.driver.sleep(1000);
        });

        create_linked_deal_form.submit().then(()=>{
          browser.driver.sleep(4000);
        });
      })
    })
  })
});


