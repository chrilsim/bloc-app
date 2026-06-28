import { Search } from "lucide-react";
import { useState } from "react";
import { AllData } from "../data/AllData";
import { Link } from "react-router-dom";
export default function SearchPage() {
  const [search, setSearch] = useState("");

  const keyword = search.toLowerCase().trim();
  const filteredVendors = AllData.filter((vendor) =>
    vendor.username.toLowerCase().includes(keyword)
  );

  const filteredProducts = AllData.flatMap((vendor) =>
    vendor.items
      .filter((item) => item.name.toLowerCase().includes(keyword))
      .map((item) => ({
        ...item,
        vendorId: vendor.id,
        vendorName: vendor.username,
        vendorImage: vendor.profileImage,
      }))
  );
  return (
    <div className="max-w-[1500px]  mx-auto p-5">

      {/* Search */}
      <div className="relative mb-8">
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search stores or products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-12 rounded-full bg-gray-100 pl-14 pr-5 outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {keyword === "" ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <Search size={55} className="text-gray-300" />

          <h1 className="text-3xl font-bold mt-6">
            Search Anything
          </h1>

          <p className="text-gray-500 mt-2">
            Search stores and products
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-5">
            Stores ({filteredVendors.length})
          </h2>

          {filteredVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {filteredVendors.map((vendor) => (
                <Link
                  to={`/product-detail/${vendor.id}`}
                  key={vendor.id}
                >
                  <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
                    <img
                      src={vendor.coverImage}
                      alt={vendor.username}
                      className="w-full h-40 object-cover"
                    />

                    <div className="p-4 flex gap-3">
                      <img
                        src={vendor.profileImage}
                        alt={vendor.username}
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-bold line-clamp-2">
                          {vendor.username}
                        </h3>

                        <p className="text-sm text-gray-500">
                          ⭐ {vendor.rating}
                        </p>

                        <p className="text-sm text-gray-500">
                          {vendor.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          ) : (
            <p className="text-gray-500">No stores found.</p>
          )}
        </>
      )}
    </div>
  );
}