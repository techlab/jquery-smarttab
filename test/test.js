describe('SmartTab Default Options', function() {
    var el;

    beforeEach(function(){
        jasmine.getFixtures().fixturesPath = 'base/test';
        loadFixtures('test-template.html');

        el = $('#smarttab');
        el.smartTab();
    });

    afterEach(function(){
        el.remove();
        el = null;
    });

    it('should add default class to the element', function() {
        expect(el).toHaveClass("st");
    });

    it('should add default theme to the element', function() {
        expect(el).toHaveClass("st-theme-basic");
    });

});
