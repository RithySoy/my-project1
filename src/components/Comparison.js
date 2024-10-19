import React from 'react';

const iPhoneModels = [
  {
    name: 'iPhone 15 Pro Max',
    price: 1199,
    pricePerMonth: 49.95,
    screenSize: 6.9,
    display: 'Super Retina XDR display',
    features: ['ProMotion technology', 'Always-On display'],
    battery: '29 hours video playback',
    camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
    chip: 'A17 Bionic chip',
  },
  {
    name: 'iPhone 15 Pro',
    price: 999,
    pricePerMonth: 41.62,
    screenSize: 6.3,
    display: 'Super Retina XDR display',
    features: ['ProMotion technology', 'Always-On display'],
    battery: '28 hours video playback',
    camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
    chip: 'A17 Bionic chip',
  },
  {
    name: 'iPhone 15',
    price: 799,
    pricePerMonth: 33.29,
    screenSize: 6.1,
    display: 'Super Retina XDR display',
    features: [],
    battery: '26 hours video playback',
    camera: '48MP Main, 12MP Ultra Wide',
    chip: 'A16 Bionic chip',
  },
];

const ProductComparison = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">iPhone Models Comparison</h1>
      
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Feature</th>
            {iPhoneModels.map((model, index) => (
              <th key={index} className="border px-4 py-2">{model.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Price</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">${model.price}</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2">Price per Month</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">${model.pricePerMonth}/mo.</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2">Screen Size</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">{model.screenSize}"</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2">Display</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">{model.display}</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2">Battery Life</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">{model.battery}</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2">Camera</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">{model.camera}</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2">Chip</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">{model.chip}</td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2">Features</td>
            {iPhoneModels.map((model, index) => (
              <td key={index} className="border px-4 py-2">
                {model.features.length > 0
                  ? model.features.join(', ')
                  : 'Standard Features'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductComparison;
