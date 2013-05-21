minispade.register('core', function() {

  /**
   * @class
   *
   * Node models a Riak Node participating in a cluster.
   */
  RiakControl.Node = DS.Model.extend(
    /** @scope RiakControl.Node.prototype */ {

    /**
     * Use the node name and ip address as the
     * unique identifier for the node.
     */
    primaryKey: 'name',

    name: DS.attr("string"),
    status: DS.attr("string"),
    reachable: DS.attr("boolean"),

    ring_pct: DS.attr("number"),
    pending_pct: DS.attr("number"),

    mem_total: DS.attr("number"),
    mem_used: DS.attr("number"),
    mem_erlang: DS.attr("number"),
    low_mem: DS.attr("boolean"),

    /**
     * This boolean attribute determines if the node
     * responsible for the API requests is running
     * Riak Control.
     */
    me: DS.attr("boolean"),

    /**
     * Whether this node is currently the claimant or not.
     */
    claimant: DS.attr("boolean")
  });

  /**
   * @class
   *
   * Model an actual ownership handoff.
   */
  RiakControl.Handoff = DS.Model.extend(
    /** @scope RiakControl.Handoff.prototype */ {

    /**
     * Use the partition index as a primary key
     */
    primaryKey: 'index',

    index: DS.attr("string"),

    owner: DS.attr("string"),
    next_owner: DS.attr("string"),

    waiting_for: DS.attr("string")

  });

  RiakControl.RingStatus = Ember.Object.extend({
    claimant: undefined,
    ringReady: undefined,

    /**
     * Determines how many handoffs are currently happening.
     * CURRENTLY RETURNS EXAMPLE CODE.
     *
     * @returns {Number} - The number of handoffs currently happening.
     */
    currentHandoffs: function(){
      return 24;
    }.property()
  });

  // vv THESE ARE JUST FOR TESTING, REMOVE vv

  RiakControl.RingStatus.fixtureStatus = RiakControl.RingStatus.create({
    claimant: 'dev1@127.0.0.1',
    ringReady: true
  });

  RiakControl.RingStatus.reopenClass({
    find: function(){
      return RiakControl.RingStatus.fixtureStatus;
    }
  });

  // ^^ THESE ARE JUST FOR TESTING, REMOVE ^^

  /**
   * @class
   *
   * Partition represents one of the partitions in the
   * consistent hashing ring owned by the cluster.
   */
  RiakControl.Partition = DS.Model.extend(
    /** @scope RiakControl.Partition.prototype */ {

    /**
     * Use the index into the ring as the primary key and
     * unique identifier for this particular partition.
     */
    primaryKey: 'index',

    n_val: DS.attr("number"),
    available: DS.attr("number"),
    quorum: DS.attr("number")

  });

});
