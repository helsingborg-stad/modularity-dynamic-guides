declare namespace acf {
    function add_filter(name: string, callback: Function, priority?: number): void;
    function addAction(name: string, callback: Function, priority?: number): void;
    function remove_filter(name: string, callback: Function): void;
    function getField(key: String): InstanceType
    function getFields(args: Object): Array<InstanceType>
}