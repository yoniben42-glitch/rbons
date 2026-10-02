# Rbonsu Photography — Source of Truth

The standalone application is the implementation target. The live Squarespace site and Acuity account were used only as reference sources during the build.

## Reference facts used

- Public site navigation included Home, Galleries, Social Media, and Contact.
- Public gallery categories included Weddings, Maternity, Engagement, LifeStyle & Birthdays, Newborn/Kids & Family Portraits, Christmas & Season, Models & Boudoir, and a template-like Project Three entry.
- Acuity contained a Consultation appointment with a 50-minute duration and a $45 reference price.
- The Richard Bonsu calendar was configured Sunday-Friday 09:00-17:00 and Saturday closed.
- Booking limits shown in Acuity were 12 hours minimum advance, 365 days maximum ahead, 1 appointment per time slot, and 12 hours for client cancellation/rescheduling.
- The customer-facing scheduler displayed Eastern Time.
- The observed customer form collected first name, last name, optional phone, and email.

## Deliberately not carried into this release

- Online payment processing
- Stripe/Square/PayPal checkout
- Payment webhooks
- Payment balances/deposits
- Payment secrets

## Owner-controlled items that require final verification before handover

- Final business wording and service descriptions
- Final working timezone if different from the inspected Acuity setting
- Final service list and pricing
- Final gallery asset migration
- Final email sender/recipient configuration
- Final domain and social URLs
