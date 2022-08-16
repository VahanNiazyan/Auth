
<template>
  <div v-if="session.resent" class="rounded-md bg-blue-50 p-4 mb-6 shadow">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm leading-5 text-blue-700">
          Wir haben dir eine neue Verifikations-E-Mail an deine angegebene E-Mail Adresse geschickt.
        </p>
      </div>
    </div>
  </div>

  <div class="rounded-md bg-green-50 p-4 shadow">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm leading-5 font-medium text-green-800">
          Danke f&uuml;r deine Registrierung
        </h3>
        <div class="mt-2 text-sm leading-5 text-green-700">
          <p>
            Bitte bestätige deine E-Mail Adresse, indem du auf den Link in der E-Mail klickst, die wir die gerade an
            deine angegebene E-Mail Adresse haben zukommen lassen. Falls du auch nach einigen Minuten keine E-Mail von
            uns erhalten hast, schaue bitte in deinem Spam- oder Junk-Postfach nach oder lass dir eine neue
            Verifikations-E-Mail schicken.
          </p>
        </div>
        <div class="mt-4">
          <div class="-mx-2 -my-1.5 flex">
            <data-submitter inline-template method="POST" url="/customer/verification/resend">
              <button @click="submit" class="px-2 py-1.5 rounded-md text-sm leading-5 font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:bg-green-100 transition ease-in-out duration-150">
                Neue Verfikations-E-Mail senden
              </button>
            </data-submitter>
            <a href="/current" class="ml-3 px-2 py-1.5 rounded-md text-sm leading-5 font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:bg-green-100 transition ease-in-out duration-150">
              Aktualisieren
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">{{ __('Verify Your Email Address') }}</div>

          <div class="card-body">
            <div v-if="session.resent"  class="alert alert-success" role="alert">
              A fresh verification link has been sent to your email address.
            </div>

            Before proceeding, please check your email for a verification link.
            If you did not receive the email
            <form class="d-inline" method="POST"  @submit="" @submit.prevent="$emit('submit')">
              <button type="submit" class="btn btn-link p-0 m-0 align-baseline">
                click here to request another
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
