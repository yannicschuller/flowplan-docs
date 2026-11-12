---
keywords: environment variables, env, variables, configuration, reference, .env
filter: true
---

# All environment variables

Every environment variable of Flowplan in one table, from A to Z – with its default, its meaning in one sentence and the section that describes it in full.

The variables are read when the container starts, for example from the `.env` file next to `compose.yaml` or from the environment variables in Coolify ([Installation](/installation)). Many values can also be set in the **Administration**; what is saved there takes precedence ([In the interface](/configuration#in-the-interface)).

The list is put together from the pages of this documentation; a test checks against Flowplan's code that no variable is missing. The field above the table filters it, also by parts such as `S3_` or `OIDC`.

{{reference:env}}
