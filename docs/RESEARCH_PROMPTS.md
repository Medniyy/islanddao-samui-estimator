# Research prompts — refresh `samui-prices.json`

Copy each prompt into ChatGPT, Perplexity, or similar. Paste the resulting numbers into `src/data/samui-prices.json`, then redeploy.

## 1. International flights (June, economy RT to Bangkok)

```
For each region below, give typical round-trip economy flight USD to Bangkok (BKK) for travel in June 2026: low, mid, high.
Regions: US, UK, Germany, France, Netherlands, Sweden, UAE, India, China, Japan, South Korea, Hong Kong, Singapore, Malaysia, Vietnam, Australia, New Zealand, Canada, Brazil, South Africa.
Cite sources (Google Flights, Skyscanner). Output JSON array: { id, label, flights: { low, mid, high } }.
```

## 2. Koh Samui daily costs (2026)

```
Estimate USD per day for Koh Samui in three tiers (budget, mid, premium):
- accommodationPerNight (low/mid/high)
- foodPerDay (low/mid/high)
- nightlifePerDay (low/mid/high)
Also: Bangkok to Samui RT flight vs bus+ferry; motorbike per day and weekly bundle; SIM + misc buffer.
Use Numbeo, Exiap, ThingsToDoInSamui. Output JSON matching our samui-prices.json structure.
```

## 3. Nomadz vs OTA (Samui, June 2026)

```
For Koh Samui stays 3–28 June 2026, compare Nomadz.xyz vs Booking.com mid-tier hotels:
sample 5 properties, percent savings on accommodation only.
Return suggested nomadzSavingsPercentLow/Mid/High (0.4–0.6 range).
```
