# Multi-Step Pre-Owned Car Loan Form

This feature implements a **multi-step loan eligibility flow** using **React + Vite + Tailwind CSS**.

## What this feature does

- Guides the user through **step-by-step form screens**
- Validates each step before allowing navigation
- Runs an async **bureau check** after address submission
- Shows a final **eligibility / rejection message** based on business rules

## Steps

1. Select car brand (Toyota / Kia)
2. Select car model (brand-based)
3. Select house type
4. Enter address + SSN (Fire Alarm required if state = FL)
5. Show eligibility result

## Eligibility Rules

User is eligible **only if all conditions are met**:

- Toyota → Land Cruiser / Fortuner **OR** Kia → Seltos / Carens
- House type is **Own** or **Mortgage**
- If state is **FL**, Fire Alarm must be **Yes**
- Bureau score **> 650**

## Key Implementation Notes

- Single source of truth for form state
- Step-wise validation via helper function
- Async logic handled during step transition
- SSN stored raw in state and masked only in UI
