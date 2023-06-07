const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
//const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');

const {
  BasicTracerProvider,
  ConsoleSpanExporter,
  BatchSpanProcessor,
  SimpleSpanProcessor
} = require('@opentelemetry/sdk-trace-base')
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation'); 

const exporter = new JaegerExporter({
  endpoint: 'http://openzipkin:14268/api/traces',
  headers: {
    "content-type": "application/json"
  }
});

 
const exporter2 = new ZipkinExporter({

  url: 'http://zipkin-all-in-one:9411/api/v2/spans',

});

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'nodejs-rest-http-crud',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: "production",
    [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",

  })
});
//provider.addSpanProcessor(new BatchSpanProcessor(exporter))
provider.addSpanProcessor(new BatchSpanProcessor(exporter2))

 // Enable to see the spans printed in the console by the ConsoleSpanExporter
//provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter())) 


//provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

 provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation({
      requestHook: (span, requestInfo) => {
        span.setAttribute(
          'http.request.headers',
          JSON.stringify(requestInfo.request.headers)
        );

        
      }
    }),
    new ExpressInstrumentation({
      ignoreLayersType: ['middleware'],
      requestHook: (span, requestInfo) => {
        span.setAttribute(
          'http.request.request_body',
          JSON.stringify(requestInfo.request.body)
        );
        span.setAttribute(
          'http.request.query_params',
          JSON.stringify(requestInfo.request.query)
        );
        span.setAttribute(
          'http.request.headers',
          JSON.stringify(requestInfo.request.headers)
        );
        
      }
    })
  ],
  tracerProvider: provider
});
const tracer = provider.getTracer('nodejs-rest-http-crud')
//tracer.getTracer('nodejs-rest-http-crud');