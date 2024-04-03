# Enterprise SSO / SAML login

This app shows how you can use SuperTokens to add SAML and email password login to your app.

## How to configure a new customer in your app

### Step 1: Create and configure BoxyHQ (SAML client)

#### Create a new tenant in BoxyHQ

```bash
curl --location --request POST 'https://boxy.supertokens.sraak.com/api/v1/saml/config' \
--header 'Authorization: Api-Key DU$UW7jCwVt*Ac' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'metadataUrl=https://login.microsoftonline.com/97f9a564-fcee-4b88-ae34-a1fbc4656593/federationmetadata/2007-06/federationmetadata.xml?appid=dd2140e9-c928-4966-af04-eb291f113e90' \
--data-urlencode 'defaultRedirectUrl=http://localhost:3000/auth/callback/boxy-saml' \
--data-urlencode 'redirectUrl=http://localhost:3000/auth/callback/boxy-saml' \
--data-urlencode 'tenant=customer1' \
--data-urlencode 'product=demo' \
--data-urlencode 'name=demo-connection' \
--data-urlencode 'description=Demo SAML connection'
```

- In the above, we get the metadataUrl from the customer.
- The callback URL points to our application on `localhost:3000`. We can add multiple callback URLs as well.
- The `tenant` value is the same as what we will use in SuperTokens (`customer1` in this case).
- The `name` and `description` is only for human consumption.
- The output of the above command will create a client ID and secret that you will have to feed into SuperTokens (see next step).

### Step 2: Create and configure the customer in SuperTokens

##### Create a new tenant in SuperTokens

```bash
curl --location --request PUT 'https://st-dev-63dc2850-f17e-11ee-bbd5-47cbb663b9bc.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: SeSccI0VtPYvjX=enl23ekn2wa' \
--data-raw '{
    "tenantId": "customer1",
    "emailPasswordEnabled": false,
    "thirdPartyEnabled": true,
    "passwordlessEnabled": false
}'
```

#### Configure SAML connection

```bash
curl --location --request PUT 'https://st-dev-63dc2850-f17e-11ee-bbd5-47cbb663b9bc.aws.supertokens.io/customer1/recipe/multitenancy/config/thirdparty' \
--header 'Content-Type: application/json' \
--header 'api-key: SeSccI0VtPYvjX=enl23ekn2wa' \
--data-raw '{
  "config": {
    "thirdPartyId": "boxy-saml",
    "name": "Microsoft Login",
    "clients": [
      {
        "clientId": "ddec7cb43c959fb5fa209824e1e00795d3f6977b",
        "clientSecret": "a6707b51ede5b65cb8448516c8958c051a252e39bca6b5e8",
        "additionalConfig": {
          "boxyURL": "https://boxy.supertokens.sraak.com"
        }
      }
    ]
  }
}'
```