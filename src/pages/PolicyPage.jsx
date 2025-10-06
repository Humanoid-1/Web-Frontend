import React from "react";
import "./PolicyPage.css";
import { Link } from "react-router-dom";

export default function PolicyPage() {
  return (
    <main className="policy-container">
      <section className="policy-content">
        {/* Header */}
        <header className="policy-header">
          <h1>Policies — Humanoid Maker Shop</h1>
          <p>
            We're committed to transparency and great service. Please read below for our warranty, return, and refund policies.
          </p>
        </header>

        {/* Warranty Policy */}
        <div className="policy-section">
          <h2>📦 Warranty Policy</h2>
          <ul>
            <li><strong>Brand New Laptops:</strong> Covered under manufacturer warranty (typically 1 year). Contact us or the manufacturer for service.</li>
            <li><strong>Certified Refurbished:</strong> 6-month in-house warranty covering hardware defects.</li>
            <li><strong>Pre-Owned Laptops:</strong> 3-month warranty with full testing and quality check assurance.</li>
            <li><strong>Accessories (Chargers, Keyboards, Mice, Bags, etc.):</strong> 1-month replacement warranty for manufacturing defects.</li>
            <li><strong>Upgrades (SSD/RAM):</strong> Lifetime warranty on parts (where applicable), 3 months on installation service.</li>
          </ul>
        </div>

        {/* Terms & Conditions */}
        <div className="policy-section">
          <h2>📄 Terms & Conditions</h2>
          <ol>
            <li>Warranty is void if the product shows signs of physical damage, liquid damage, or unauthorized repair/modification.</li>
            <li>Customer must provide original invoice for warranty claims.</li>
            <li>Software issues (e.g., OS corruption, viruses) are not covered unless otherwise stated.</li>
            <li>We reserve the right to repair, replace, or refund the item at our discretion.</li>
            <li>Shipping costs (for warranty claims) are the customer's responsibility unless agreed otherwise.</li>
            <li>No returns on accessories once opened unless defective on arrival.</li>
          </ol>
        </div>

        {/* Return Policy */}
        <div className="policy-section">
          <h2>🔄 Return Policy</h2>
          <ul>
            <li>You may return eligible products within <strong>7 days</strong> of purchase for a refund or exchange.</li>
            <li>Items must be returned in their original condition, with all accessories and packaging.</li>
            <li><strong>Non-returnable:</strong> Opened accessories (e.g., cables, mouse pads), software licenses, and items damaged by user.</li>
            <li>Returns due to change of mind may be subject to a 10% restocking fee.</li>
          </ul>
        </div>

        {/* Refund Process */}
        <div className="policy-section">
          <h2>💸 Refund Process</h2>
          <ul>
            <li>Once we receive and inspect the returned item, we’ll notify you of the approval or rejection of your refund.</li>
            <li>Approved refunds are processed within 3–5 business days.</li>
            <li>Refunds are issued via the original payment method.</li>
            <li>Shipping charges are non-refundable unless the return is due to our error.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="policy-footer">
          <p>
            Still have questions? <Link to="/ContactUs">Contact us here</Link> and we’ll be glad to help.
          </p>
          <p>
            <strong>Note:</strong> Our goal is to be fair, transparent, and customer-friendly. Thank you for choosing Humanoid Maker Shop.
          </p>
        </div>
      </section>
    </main>
  );
}
