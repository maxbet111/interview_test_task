
    // spec.js

    describe('Protractor Test task', function() {

        var loginLink = element(by.xpath('//a[@class="btn flat-dark ng-scope"]'));
        var loginEmailField = element(by.model('form.email'));
        var loginPassField = element(by.model('form.password'));
        var loginButton = element(by.xpath('//button[@class=btn block primary]'));
        var eyeButton = element(by.xpath('//button[@type="button"]'));
        var invalidMessage = element(by.xpath('//span[@class="noty_text"]'));
        var dropdown = element(by.xpath('//button[@class="btn btn-s round filled dropdown-btn ng-isolate-scope"]'));
        var logOut = element(by.xpath('//button[contains(text(),"Log out")]'));
        var viewProfile = element(by.xpath('//a[contains(text(),"View profile")]'));
        var updatePinBtn = element(by.model('user.supportPin'));

        var profName = expect(element(by.xpath('//div[@class=description]').getText()).toContain('Vasya Pupkin'));
        var profEmail = expect(element(by.xpath('//div[@class=description]').getText()).toContain('ssls.automation+5@gmail.com'));
        var profPhone = expect(element(by.xpath('//div[@class=description]').getText()).toContain('+380 57123456789'));
        var profAddress = expect(element(by.xpath('//div[@class=description]').getText()).toContain("Diagon alley 2, Misto, Uryupinsk 612120, Ukraine"));
        var profPin = expect(element(by.xpath('//div[@class=description]').getText()).toContain("LRzE"));
        var personalBtn = element(by.xpath("//a[@class='btn block round control active']"));
        var multiDomeinBtn = element(by.xpath("//a[contains(text(),'multi-domain')]"));
        var cheapestBtn = element(by.xpath("//span[@class='icon icon-sort-alt-up']"));

        var loginPass = "123456";
        var loginEmail = "ssls.automation+5@gmail.com";




    beforeEach(function() {
        browser.get('https://www.ssls.com/');
    });

        it('tc1. Authorization page (Welcome back!)', function() {

            loginLink.click();
            loginEmailField.sendKeys(loginEmail);
            loginPassField.sendKeys(loginPass);
            eyeButton.click();
            expect(loginPassField.getText()).equal(loginPass);
            loginButton.click();

    });

        it('tc2. Authorization page. Not registered user!) ', function() {

            loginLink.click();
            loginEmailField.sendKeys('test@gmail.com');
            loginPassField.sendKeys(12345);
            eyeButton.click();
            loginButton.click();


        });

        it('tc3. Authorization page. Invalid email!) ', function() {

            loginLink.click();
            loginEmailField.sendKeys('test@gmail.com');
            loginPassField.sendKeys(loginPass);
            eyeButton.click();
            loginButton.click();
            expect(invalidMessage).isDisplayed().toBeTruthy();

        });

        it('tc4. Authorization page. Empty fields ', function() {

            loginLink.click();
            loginEmailField.clear();
            loginPassField.clear();
            loginButton.click();
            expect(element(by.xpath('//*[contains(text(),"Looks like you’ve")]')).isDisplayed().toBeTruthy());
            expect(element(by.xpath('//*[contains(text(),"enter your email")]')).isDisplayed().toBeTruthy());

        });

        it('tc5. Log Out ', function() {

            loginLink.click();
            loginEmailField.sendKeys(loginEmail);
            loginPassField.sendKeys(loginPass);
            loginButton.click();
            dropdown.click();
            logOut.click();
            browser.wait(urlChanged("https://www.ssls.com/authorize"), 5000);


        });

        it('tc6 Precondition. My profile page. Client area', function() {

            loginLink.click();
            loginEmailField.sendKeys(loginEmail);
            loginPassField.sendKeys(loginPass);
            loginButton.click();
            dropdown.click();
            viewProfile.click();
            browser.wait(urlChanged("https://www.ssls.com/user/profile"), 5000);
            expect(element(by.xpath('//div[@class=description]').getText()).toContain('Vasya Pupkin'));
            expect(element(by.xpath('//div[@class=description]').getText()).toContain('ssls.automation+5@gmail.com'));
            expect(element(by.xpath('//div[@class=description]').getText()).toContain('+380 57123456789'));
            expect(element(by.xpath('//div[@class=description]').getText()).toContain("Diagon alley 2, Misto, Uryupinsk 612120, Ukraine"));
            expect(element(by.xpath('//div[@class=description]').getText()).toContain("LRzE"));
            dropdown.click();
            logOut.click();

        });

            it ('ct6. Check profile fields', function () {
                loginLink.click();
            loginEmailField.sendKeys(loginEmail);
            loginPassField.sendKeys(loginPass);
            loginButton.click();
            dropdown.click();
            viewProfile.click();
            expect(profName.isDisplayed()).equal("Vasya Pupkin");
            expect(profEmail.isDisplayed()).equal("ssls.automation+5@gmail.com");
            expect(profPhone.isDisplayed()).equal("+380 57123456789");
            expect(profAddress.isDisplayed()).equal("Diagon alley 2, Misto, Uryupinsk 612120, Ukraine");
            expect(profPin.isDisplayed()).equal("LRzE");

        });


        it ('ct7. My profile page. Refresh support pin', function () {
            loginLink.click();
            loginEmailField.sendKeys(loginEmail);
            loginPassField.sendKeys(loginPass);
            loginButton.click();
            dropdown.click();
            viewProfile.click();
            updatePinBtn.click();
            expect(profPin.getText()).notEqual('Hb9q');

        });

        it ('ct8. Home page. Filters', function () {

            personalBtn.click();
            element.all(by.xpah("//h3[@class='ssl-name ng-binding']")).then(function(items) {
                expect(items.length).toBe(5).isDisplayed();
            });
            multiDomeinBtn.click();
            expect(element(by.xpath("//h3[contains(text(),'PositiveSSL Multi-Domain')]"))).isDisplayed().only();
            cheapestBtn.click();
            expect(element(by.xpath("//h3[contains(text(),'PositiveSSL Multi-Domain')]"))).isDisplayed().sort();

        });
        });
