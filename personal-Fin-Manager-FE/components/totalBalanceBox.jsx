import React from "react";

const TotalBalanceBox = ({ accounts = [], totalBanks, totalCurrentBalance }) => {
  return (
    <section className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
      {/* Doughnut Chart Placeholder */}
      <div>
        <span>
          {totalBanks}
        </span>
      </div>

      {/* Balance Info */}
      <div>
        <h2>
          Bank Accounts: {totalBanks}
        </h2>

        <div>
          <p>
            Total Current Balance
          </p>
          <p>
            ${totalCurrentBalance?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
