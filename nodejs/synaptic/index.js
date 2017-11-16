function testSynaptic()
{
    var synaptic = require('synaptic');
    var Neuron = synaptic.Neuron,
        Layer = synaptic.Layer,
        Network = synaptic.Network,
        Trainer = synaptic.Trainer,
        Architect = synaptic.Architect;

    function Perceptron(input, hidden, output)
    {
        // create the layers
        var inputLayer = new Layer(input);
        var hiddenLayer = new Layer(hidden);
        var outputLayer = new Layer(output);

        // connect the layers
        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        // set the layers
        this.set({
            input: inputLayer,
            hidden: [hiddenLayer],
            output: outputLayer
        });
    }

    // extend the prototype chain
    Perceptron.prototype = new Network();
    Perceptron.prototype.constructor = Perceptron;

    var myPerceptron = new Perceptron(2,3,1);
    var myTrainer = new Trainer(myPerceptron);
    var learningRate = 0.3;

    // myTrainer.XOR();

    function training(show) {
        var ret1 = myPerceptron.activate([0,0]);
        myPerceptron.propagate(learningRate, [0]);

        var ret2 = myPerceptron.activate([1,0]);
        myPerceptron.propagate(learningRate, [1]);

        var ret3 = myPerceptron.activate([0,1]);
        myPerceptron.propagate(learningRate, [1]);

        var ret4 = myPerceptron.activate([1,1]);
        myPerceptron.propagate(learningRate, [0]);

        if (show) {
            console.log("Show result:");
            console.log(ret1);
            console.log(ret2);
            console.log(ret3);
            console.log(ret4);
        }
    }

    function checkTrainResult(a, b) {
        var ret = myPerceptron.activate([a, b])
        console.log(`input a=${a}, b=${b}; output result=${ret}`);
    }

    console.log("try first time:")
    training(true);

    var times = 10000;
    for (var i = 0; i　< times; i++) {
        training();
    }

    console.log(`--> after training ${times} times <--`);
    // training(true);

    checkTrainResult(100, 200);
    checkTrainResult(100, 100);
    checkTrainResult(100, 10000);
}

testSynaptic();
