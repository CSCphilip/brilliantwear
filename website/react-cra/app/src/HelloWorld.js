const HelloWorld = () => {

    function sayHello() {
        alert('Hello, World!');
    }

    return (
        <button onClick={sayHello}>Click me for an alert!</button>
    );
};

export default HelloWorld;