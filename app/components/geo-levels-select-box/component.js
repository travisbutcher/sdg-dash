import Ember from 'ember';

export default Ember.Component.extend({
  
  didInsertElement() {
    let elId = '#geo-levels-selector';
    this.$(elId).selectpicker({
      style: 'btn-default',
      selectOnTab: true,
      size: 8,
      noneSelectedText: 'No Data',
      width: '210px'
    });

    this.$(elId).on('change', function () {
      let sel = this.$(elId).val();
      
      let levels = this.get('session').get('available_dashboard_levels');
      let new_level = levels.filter(function (l) { return l.title === sel })[0];
      this.get('session').set('selected_dashboard', new_level);

      this.sendAction('goToGeoLevel', sel);

    }.bind(this));
  },

  didUpdate() {
    let elId = '#geo-levels-selector';
    let len = this.get('session').get('available_geo_levels').length;
    let disabled = (len <= 1) ? true : false;
    this.$(elId).prop('disabled', disabled);
    let val = this.get('session').get('selected_geo_level');
    this.$(elId).selectpicker('val', val);
    this.$(elId).selectpicker('refresh');
  }
});