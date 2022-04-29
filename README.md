# Google Data Studio Visualizations from Highcharts

## Workflow

Since Google's own [tooling is broken](https://github.com/googledatastudio/tooling/issues) as
of writing this, we have our own simple build tools:

* Make edits in the `/src` files only.
* To build and deploy to dev stage, run `node tools/deploy --name {vizname}`. For this to work, `gsutil` must be installed and access granted to the Google Cloud bucket.
* Test online. In a new GDS project import a Community Viz => Explore More => Build your own visualization, then under Manifest path, enter `gs://highcharts-data-studio-visualizations/{vizname}-dev`
* To deploy to prod, run `node tools/deploy --name {viz name} --stage prod`.