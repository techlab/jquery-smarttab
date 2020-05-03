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
        expect(el).toHaveClass("st-theme-default");
    });

    it('should show the first tab', function() {
        expect(el.find('.nav').find('.nav-link').first()).toHaveClass("active");
    });

    it('should not show other tabs', function() {
        expect(el.find('.nav').find('.nav-link:not(:first)')).not.toHaveClass("active");
    });

});
