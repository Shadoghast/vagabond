export class VagabondUser extends User {
  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    Hooks.callAll("ds.prepareUserData", this);
  }
}
