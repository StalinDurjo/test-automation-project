# WooCommerce Test Cases

## Test Approach Rationale

1. **Priority-Based Testing**: Focus on critical user paths and features that directly impact sales and user experience
2. **Boundary Testing**: Include edge cases for product variations and categories
3. **Modular Structure**: Organized by functional areas for maintainability
4. **Preconditions**: Clear setup requirements for each test section
5. **Expected Results**: Specific, measurable outcomes

## 1. Product Management

### Prerequisites
- WooCommerce installed and activated
- Admin access
- Sample product data

### Test Cases

#### 1.1 Basic Product Creation
| ID | Description | Steps | Expected Result |
|----|-------------|-------|-----------------|
| P01 | Create simple product | 1. Navigate to Products > Add New<br>2. Enter product title<br>3. Set regular price $10<br>4. Add short description<br>5. Publish | - Product appears in catalog<br>- Price displays correctly<br>- Can be added to cart |
| P02 | Create variable product | 1. Create product<br>2. Set type as Variable<br>3. Add attribute (Size: S,M,L)<br>4. Create variations<br>5. Set prices | - All variations display<br>- Customer can select options<br>- Correct prices show |
| P03 | Duplicate product | 1. Select existing product<br>2. Click Duplicate<br>3. Modify duplicate | - New product created<br>- Maintains original attributes<br>- Can be edited independently |

#### 1.2 Product Categories
| ID | Description | Steps | Expected Result |
|----|-------------|-------|-----------------|
| C01 | Create category hierarchy | 1. Add parent category<br>2. Add child category<br>3. Assign product | - Hierarchy displays correctly<br>- Products show in both categories<br>- Breadcrumbs work |
| C02 | Category shortcode | 1. Add [product_category] shortcode<br>2. Set category parameter<br>3. View page | - Products from category display<br>- Pagination works<br>- Sorting functions |

## 2. Store Settings

### Prerequisites
- Clean WooCommerce installation
- Default theme active

### Test Cases

#### 2.1 General Settings
| ID | Description | Steps | Expected Result |
|----|-------------|-------|-----------------|
| S01 | Configure store location | 1. Set country/region<br>2. Set address<br>3. Save changes | - Tax calculations correct<br>- Shipping options update<br>- Currency updates |
| S02 | Set selling locations | 1. Set specific countries<br>2. Add 3 countries<br>3. Try purchase | - Only listed countries available<br>- Shipping limited correctly<br>- Tax rules apply |

#### 2.2 Product Settings
| ID | Description | Steps | Expected Result |
|----|-------------|-------|-----------------|
| PS01 | Configure measurements | 1. Set weight unit<br>2. Set dimension units<br>3. Add product | - Units display correctly<br>- Calculations accurate<br>- Shipping uses correct units |
| PS02 | Review settings | 1. Enable reviews<br>2. Set review requirements<br>3. Test as customer | - Review form shows<br>- Validation works<br>- Moderation functions |

## 3. Page Integration

### Prerequisites
- Default pages created
- Theme supports WooCommerce

### Test Cases

#### 3.1 Core Pages
| ID | Description | Steps | Expected Result |
|----|-------------|-------|-----------------|
| W01 | Shop page functionality | 1. View shop page<br>2. Test filters<br>3. Try sorting | - Products display<br>- Filters work<br>- Sort orders correct |
| W02 | Cart process | 1. Add product to cart<br>2. Update quantity<br>3. Remove item | - Updates instantly<br>- Totals recalculate<br>- Empty cart displays |

## 4. Edge Cases

### Test Cases

#### 4.1 Product Variations
| ID | Description | Steps | Expected Result |
|----|-------------|-------|-----------------|
| E01 | Max variations | 1. Create product with 50 variations<br>2. Set different prices<br>3. View frontend | - All variations load<br>- Selection works<br>- Performance acceptable |
| E02 | Out of stock handling | 1. Set variation to 0 stock<br>2. View product<br>3. Try purchase | - Shows as unavailable<br>- Cannot be selected<br>- Error if attempted |